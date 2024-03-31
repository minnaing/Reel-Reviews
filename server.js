// Import necessary modules
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

//Helmet.js use for Securing  Express HTTP Headers
var helmet = require("helmet");

// In API routes or getServerSideProps
// import { serialize } from 'cookie';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Set-Cookie', serialize('token', 'yourTokenValue', { path: '/' }));
//   res.status(200).json({ message: 'Cookie set' });
// }

// Initialize the express application
const app = express();
//
// Use environment variable for port or default to 9999
const PORT = process.env.PORT || 9999;

// Helmet Security Header Set Up. X-Content-Type-Options by default on
app.use(
  helmet({
    strictTransportSecurity: {
      maxAge: 15552000, // Set to one year in seconds
      includeSubDomains: true, // Include subdomains
    },
    xFrameOptions: { action: "sameorigin" },
    referrerPolicy: {
      policy: "no-referrer",
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // Allows scripts from Google Charts and inline scripts
        scriptSrc: ["'self'", "'unsafe-inline'", "https://www.gstatic.com"],
        // Allows styles from self, inline styles, and Google Fonts
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        // Allows fonts from Google Fonts
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        // Allows images from self and data URLs
        imgSrc: ["'self'", "data:"],
        // Specifies the URLs that can be used to connect (fetch, XMLHttpRequest, WebSocket, etc.)
        connectSrc: ["'self'", "https://api.themoviedb.org"],
        // Add other directives as needed
      },
    },
  })
);

// Middleware setup
app.use(cors()); // Enable CORS for all origins (configure as needed for your environment)
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// Serve the favicon
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // Update the path according to your favicon's location

// Serve static files from the React app build directory and any other static assets
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public")); // Serve static files from 'public' directory

// POST endpoint to send emails
app.post("/send-email", async (req, res) => {
  // Extract data from request body
  const { name, email, message } = req.body; // Adjust these fields according to your form
  console.log("Received request:", { name, email, message }); // Log received data for debugging

  // Setup Nodemailer transporter using Gmail (configure according to your email provider)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "reelreviewstest@gmail.com", // Your email
      pass: "halyoqyczhmgbxrd", // Your email account password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
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

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}\n App running on https://localhost:3000`
  )
);
