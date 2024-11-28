import jwt from "jsonwebtoken";

// Admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    // I faced error while using caps in destructing so use small letter while sending it to headers

    const admintoken = req.headers.authorization;
    if (!admintoken) {
      // If the token is not found in headers means it will show error
      return res.status(404).json({
        success: false,
        message: "User must login",
      });
    }
    const removeBearer = admintoken.split(" ")[1];
    const tokenDecode = jwt.verify(removeBearer, process.env.JWT_KEY); // we are comparing token

    // epa decode panna token vanthu email aparam password match agala na false varum suppose match aachuna nammaku token vanthudum
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(404).json({
        success: false,
        message: "Not Authorized login Again",
      });
    }

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authAdmin;
