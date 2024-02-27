// Import necessary modules
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize the express application
const app = express();
const PORT = process.env.PORT || 9999; // Use environment variable for port or default to 9999

// Middleware setup
app.use(cors()); // Enable CORS for all origins (configure as needed for your environment)
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// POST endpoint to send emails
app.post("/send-email", async (req, res) => {
  // Extract data from request body
  const { name, email, message } = req.body; // Adjust these fields according to your form
  console.log("Received request:", { name, email, message }); // Log received data for debugging

  // Setup Nodemailer transporter using Gmail (configure according to your email provider)
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "reelreviewstest@gmail.com", // Your email
      pass: "halyoqyczhmgbxrd", // Your email account password or app-specific password
    },
  });

  // Email options
  var mailOptions = {
    from: "reelreviewstest@gmail.com", // Fixed sender email address
    to: "lchan2021@csu.fullerton.edu", // Fixed recipient email address
    subject: `Message from ${name} (${email})`, // Combine sender's name and email in the subject
    text: message, // Email body as provided in the message field
  };

  // Attempt to send the email
  try {
    let emailResult = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", emailResult); // Log the success result for debugging

    // Inside your try block, after successfully sending the email
    res.json({ message: "Email sent successfully" }); // Respond with JSON
  } catch (error) {
    console.error("Error sending email:", error.message); // Log detailed error information
    res.status(500).send("Failed to send email"); // Respond with error upon failure
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
