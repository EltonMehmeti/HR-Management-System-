const nodemailer = require("nodemailer")

const sendEmail = (name, to) => {
  const subject = "Job Application Rejection"
  const rejectionMessage = `Dear ${name},\n\nWe regret to inform you that your application for the position has been rejected. 
  We appreciate your interest in our company and wish you the best in your future endeavors.\n\nSincerely,\nThe Hiring Team`

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "corahr38@gmail.com",
      pass: "pthsochrmqubcwzm",
    },
  })

  const mailOptions = {
    from: "corahr38@gmail.com",
    to: to,
    subject: subject,
    text: rejectionMessage, // Plain text message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error)
    } else {
      console.log("Rejection email sent:", info.response)
    }
  })
}

module.exports = sendEmail