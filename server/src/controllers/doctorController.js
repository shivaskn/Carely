import doctor from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointment from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body; //Here docId is extracted from req.body. Now you can use docId to query the database or perform other operations.
    const docData = await doctor.findById(docId);
    await doctor.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availability Changed",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctor.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor Login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctors = await doctor.findOne({ email });

    if (!doctors) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctors.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctors._id }, process.env.JWT_KEY);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req;
    const appointments = await appointment.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to mark appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { docId } = req;
    const appointmentData = await appointment.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Appointment Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to cancel appointment for doctor panel

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { docId } = req;
    const appointmentData = await appointment.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointment.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Cancellation Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req;
    const appointments = await appointment.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req;
    const profileData = await doctor.findById(docId).select("-password");

    res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to update doctor profile data from doctor panel

const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available } = req.body;
    const { docId } = req

    const profileEdit = await doctor.findByIdAndUpdate(docId, {
      fees,
      address,
      available,
    });

    res.json({
      profileEdit,
      success: true,
      message: "Profile has Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    })
  }
};

export {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
