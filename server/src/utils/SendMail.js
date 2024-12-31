import nodemailer from "nodemailer";

const sendMail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASS_ID,
      },
    });

    const SendMailToUser = async (maildata) => {
      await transporter.sendMail(maildata);
    };

    const mailoption = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Welcome to our website",
      html: `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #4f46e5;
      color: #ffffff;
      text-align: center;
      padding: 30px 20px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 28px;
    }
    .email-body {
      padding: 30px 20px;
      color: #1f2937;
    }
    .email-body h2 {
      color: #4f46e5;
      margin-bottom: 15px;
    }
    .email-body p {
      line-height: 1.8;
      margin: 0 0 20px;
    }
    .cta-button {
      display: inline-block;
      margin: 20px 0;
      padding: 14px 30px;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .cta-button:hover {
      background-color: white;
    }
    .email-footer {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      padding: 15px 20px;
      background-color: #e5e7eb;
      border-top: 1px solid #d1d5db;
    }
    .email-footer a {
      color: #4f46e5;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <h1>Welcome to Carely!</h1>
    </div>

    <!-- Body -->
    <div class="email-body">
      <h2>Hello ${name},</h2>
      <p>
        Thank you for choosing Carely! We are committed to providing you with a seamless and personalized experience for all your needs.
      </p>
      <p>
        Get started with your Carely account and explore all the features designed to make your life easier. We are here to support you every step of the way.
      </p>
      <a href="http://localhost:5173/" class="cta-button">Explore Carely</a>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <p>
        This is an automated message. Please do not reply. For assistance, visit our
        <a href="http://localhost:5173/contact">Help Center</a>.
      </p>
      <p>© 2024 Carely, All Rights Reserved</p>
    </div>
  </div>
</body>
</html>`,
    };
    await SendMailToUser(mailoption);
    await transporter.sendMail(mailoption);
    console.log("Mail sended");
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
