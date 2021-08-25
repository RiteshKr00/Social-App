const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const Base_Url = process.env.base_URL;
const Transport = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.API_KEY,
  },
});

module.exports = (email, token) => {
  let mailOptions = {
    to: email,
    from: "kumarritesh14062000@gmail.com",
    subject: "Reset Password",
    html: `
    <p>You requested for password reset</p>
    <h5>Click on this <a href="${Base_Url}/resetpassword/${token}">link</a> to reset password</h5>
    `,
  };

  Transport.sendMail(mailOptions)
    .then(() => {
      console.log("Email sent.");
    })
    .catch((err) => {
      console.log("Email not sent");
      console.log(err);
    });
};
