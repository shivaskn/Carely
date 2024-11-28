import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointment from "../models/appointmentModel.js";
import user from "../models/usersModel.js"

// API for Adding doctors

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validating Email format
    if (!validator.isEmail(email)) {
      return res.status(404).json({ message: "Please enter a valid email" });
    }

    // Validating Strong password
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing Doctor Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // Stores address as an object in database
      date: Date.now(),
    };

    // This Statement Add new Doctor to the database

    const newDoctor = await doctor.create(doctorData);
    res.json({
      newDoctor,
      success: true,
      message: "New Doctor has been added",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // so na vanthu email and password ulla token ha set pannura intha condition login ku matum tha file upload ku tanniya middlewares eluthi  iruka check pannikonga

      const token = jwt.sign(email + password, process.env.JWT_KEY);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctor.find({}).select("-password"); // this select is to remove password while showing in admin panel  
    res.json({
      success: true,
      doctors
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all appointments list

const appointmentsAdmin = async (req,res) => {
  try {
    const appointments = await appointment.find({})
    res.json({
      success:true,
      appointments
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// API for  cancel the appointment

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointment.findById(appointmentId);

    await appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    // releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorsData = await doctor.findById(docId);

    let slotsBooked = doctorsData.slotsBooked;

    slotsBooked[slotDate] = slotsBooked[slotDate].filter(
      (event) => event !== slotTime
    );

    await doctor.findByIdAndUpdate(docId, { slotsBooked });

    res.json({
      success: true,
      message: "Appointment Successfully Cancelled",
    });
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message,
    });
  
  }
};


// API for get dashboard data for admin panel

const adminDashboard = async (req,res) => {
  try {
    const doctors = await doctor.find({})
    const users = await user.find({})
    const appointments = await appointment.find({})

    const dashData = {
      doctors:doctors.length,
      appointments:appointments.length,
      patients:users.length,
      lastestAppointments:appointments.reverse().slice(0,5)
    }

    res.json({
      success:true,
      dashData
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  
  }
}

export { addDoctor, loginAdmin , allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };
