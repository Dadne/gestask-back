const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log( {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `<p>${text}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {sendEmail};
