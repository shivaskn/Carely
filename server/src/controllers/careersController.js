import careers from "../models/careersModel.js";
import validator from "validator";

const careersSubmit = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Checking all the fields

    if (!name || !email || !phone) {
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

    // Adding user data to database
    const userData = {
      name,
      email,
      phone,
    };

    const jobs = await careers.create(userData);

    res.json({
      success: true,
      jobs,
      message: "Data has been submitted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { careersSubmit };
