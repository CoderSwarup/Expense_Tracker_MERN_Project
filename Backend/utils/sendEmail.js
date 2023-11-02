const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

exports.SendEmail = async (options, res) => {
  try {
    const TransPorter = nodemailer.createTransport({
      host: process.env.NODEMAILER_SERVICE, // if uou use the gamil use this "smtp.gmail.com"
      //   secure: true,
      //   port:465,  // If Not Work
      service: process.env.NODEMAILER_SERVICE,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: options?.email,
      subject: options?.subject,
      text: options?.message,
    };

    await TransPorter.sendMail(mailOptions);
    return true;
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Email Error!",
    });
  }
};
