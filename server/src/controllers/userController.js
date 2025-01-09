import validator from "validator";
import bcrypt from "bcryptjs";
import user from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctor from "../models/doctorModel.js";
import appointment from "../models/appointmentModel.js";
import razorpay from "razorpay";
import sendMail from "../utils/SendMail.js";

// Api to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking all the fields

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Validating email

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter the Valid Email",
      });
    }

    // Validating password

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please set a strong password",
      });
    }

    // Hashing password

    const hashPassword = await bcrypt.hash(password, 10);

    // Adding user data to database
    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const createUser = await user.create(userData);
    const token = jwt.sign({ id: createUser._id }, process.env.JWT_KEY);
    await sendMail(email, name);

    res.json({
      success: true,
      createUser,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// APi for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await user.findOne({ email });

    if (!checkEmail) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, checkEmail.password);

    if (isMatch) {
      const token = jwt.sign({ id: checkEmail._id }, process.env.JWT_KEY);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get user profile data (for: myprofile)

const getProfile = async (req, res) => {
  try {
    const { userId } = req;
    const userData = await user.findById(userId).select("-password");
    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to update user profile

const updateProfile = async (req, res) => {
  try {
    const { name, phone, dob, gender, address } = req.body;
    const { userId } = req;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender || !address) {
      return res.json({
        success: false,
        message: "Data missing",
      });
    }

    await user.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await user.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to book appointment

const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const { userId } = req;

    const docData = await doctor.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor is not available",
      });
    }

    let slotsBooked = docData.slotsBooked;

    // checking for slot availablity
    if (slotsBooked[slotDate]) {
      // includes(slotTime) returns true, it means that slotTime is already booked for that date, and the function responds with "Slot not available".
      //  includes(slotTime) returns false, it means the slot is free, and it can be added to the bookings.
      if (slotsBooked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available",
        });
      } else {
        slotsBooked[slotDate].push(slotTime);
      }
    } else {
      slotsBooked[slotDate] = [];
      slotsBooked[slotDate].push(slotTime);
    }

    const userData = await user.findById(userId).select("-password");
    // when we save our appointment we save the doctor data. we dont want the history of slots booked. thats why we removing the slotsbooked property from the object.
    delete docData.slotsBooked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = await appointment.create(appointmentData);
    // save new slots data in docDat. And we updating new slotdata for the doctor
    const saveDocData = await doctor.findByIdAndUpdate(
      docId,
      { slotsBooked },
      { new: true }
    );

    res.json({
      newAppointment,
      saveDocData,
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get user appointments for frontend my-appointment page

const listAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const appointments = await appointment.find({ userId });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { userId } = req;

    const appointmentData = await appointment.findById(appointmentId);

    // verify appointment user

    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized action",
      });
    }

    await appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    // releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorsData = await doctor.findById(docId);

    // the slotsBooked data from the doctorsData object, which contains all the booked slots for the doctor.
    let slotsBooked = doctorsData.slotsBooked;
    // event in the array, it checks if the event is not equal to slotTime. In simple terms, it's looking for time slots that are not the one you want to remove.
    slotsBooked[slotDate] = slotsBooked[slotDate].filter(
      (event) => event !== slotTime
    );

    await doctor.findByIdAndUpdate(docId, { slotsBooked });

    res.json({
      success: true,
      message: "Appointment Successfully Cancelled",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to make payment of appointment using razorpay

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentGateWay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or Not Found",
      });
    }

    // Creating options for razorpay payment

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order

    const order = await razorpayInstance.orders.create(options);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to verify payment of razorpay

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await appointment.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({
        success: true,
        message: "Payment Successfull",
      });
    } else {
      res.json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentGateWay,
  verifyRazorpay,
};
