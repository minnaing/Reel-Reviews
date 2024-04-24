// // Import necessary modules
// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const favicon = require("serve-favicon");
// const path = require("path");

// // Initialize the express application
// const app = express();

// app.use(cors({
//   origin: 'https://reelreviews.info'
// }));

// app.use((req, res, next) => {
//   if (req.header('x-forwarded-proto') !== 'https') {
//     res.redirect(`https://${req.header('host')}${req.url}`);
//   } else {
//     next();
//   }
// });


// //Helmet.js use for Securing Express HTTP Headers
// // const helmet = require('helmet');

// // In API routes or getServerSideProps
// // import { serialize } from 'cookie';
// // import type { NextApiRequest, NextApiResponse } from 'next';

// // export default function handler(req: NextApiRequest, res: NextApiResponse) {
// //   res.setHeader('Set-Cookie', serialize('token', 'yourTokenValue', { path: '/' }));
// //   res.status(200).json({ message: 'Cookie set' });
// // }


// //
// // Use environment variable for port or default to 9999
// const PORT = process.env.PORT || 9999;

// // const helmet = require("helmet");

// // app.use(
// //   helmet({
// //     contentSecurityPolicy: {
// //       directives: {
// //         defaultSrc: ["'self'"], // Default policy for loading content such as JavaScript, Images, CSS, Fonts, AJAX requests, Frames, HTML5 Media
// //         scriptSrc: ["'self'", "'unsafe-inline'", "https://www.gstatic.com"], // Allows scripts from these locations
// //         styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Allows styles from these locations
// //         fontSrc: ["'self'", "https://fonts.gstatic.com"], // Allows fonts from these locations
// //         imgSrc: ["'self'", "data:", "https://www.gstatic.com"], // Allows images from these locations
// //         connectSrc: ["'self'", "https://api.themoviedb.org"], // Allows connections to these locations
// //         frameSrc: ["'self'", "https://www.google.com"], // Allow iFrames from Google (for reCAPTCHA, Maps, etc.)
// //         // Add other directives as necessary
// //       },
// //     },
// //     // You can enable or disable other middlewares below:
// //     xssFilter: true, // Enables X-XSS-Protection header
// //     frameguard: { action: "sameorigin" }, // Sets X-Frame-Options header to sameorigin
// //     hsts: {
// //       maxAge: 15552000, // 180 days in seconds
// //       includeSubDomains: true,
// //     },
// //     // Other Helmet settings...
// //   })
// // );

// // Helmet Security Header Set Up. X-Content-Type-Options by default on
// // app.use(
// //   helmet({
// //     strictTransportSecurity: {
// //       maxAge: 15552000, // Set to one year in seconds
// //       includeSubDomains: true, // Include subdomains
// //     },
// //     xFrameOptions: { action: 'sameorigin' },
// //     referrerPolicy: {
// //       policy: 'no-referrer',
// //     },
// //     contentSecurityPolicy: {
// //       directives: {
// //         defaultSrc: [''self''],
// //         // Allows scripts from Google Charts and inline scripts
// //         scriptSrc: [''self'', ''unsafe-inline'', 'https://www.gstatic.com'],
// //         // Allows styles from self, inline styles, and Google Fonts
// //         styleSrc: [''self'', ''unsafe-inline'', 'https://fonts.googleapis.com'],
// //         // Allows fonts from Google Fonts
// //         fontSrc: [''self'', 'https://fonts.gstatic.com'],
// //         // Allows images from self and data URLs
// //         imgSrc: [''self'', 'data:'],
// //         // Specifies the URLs that can be used to connect (fetch, XMLHttpRequest, WebSocket, etc.)
// //         connectSrc: [''self'', 'https://api.themoviedb.org'],
// //         // Add other directives as needed
// //       },
// //     },
// //   })
// // );

// // Middleware setup
// app.use(cors()); // Enable CORS for all origins (configure as needed for your environment)

// /*
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Adjust this to match your frontend server URL
//     credentials: true, // If your frontend needs to handle cookies
//   })
// );
// */
// app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// // Serve the favicon

// // Serve static files from the React app build directory and any other static assets
// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("public")); // Serve static files from 'public' directory

// app.use(
//   favicon(path.join(__dirname, "./client/public/", "imgs", "film-reel.png"))
// ); // Update the path according to your favicon's location

// // POST endpoint to send emails
// app.post("/send-email", async (req, res) => {
//   // Extract data from request body
//   const { name, email, message } = req.body; // Adjust these fields according to your form
//   console.log("Received request:", { name, email, message }); // Log received data for debugging

//   // Setup Nodemailer transporter using Gmail (configure according to your email provider)
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "reelreviewstest@gmail.com", // Your email
//       pass: "halyoqyczhmgbxrd", // Your email account password or app-specific password
//     },
//   });

//   // Email options
//   const mailOptions = {
//     from: "reelreviewstest@gmail.com", // Fixed sender email address
//     to: "lchan2021@csu.fullerton.edu", // Fixed recipient email address
//     subject: `Message from ${name} (${email})`, // Combine sender's name and email in the subject
//     text: message, // Email body as provided in the message field
//   };

//   // Attempt to send the email
//   try {
//     let emailResult = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully", emailResult); // Log the success result for debugging

//     // Inside your try block, after successfully sending the email
//     res.json({ message: "Email sent successfully" }); // Respond with JSON
//   } catch (error) {
//     console.error("Error sending email:", error.message); // Log detailed error information
//     res.status(500).send("Failed to send email"); // Respond with error upon failure
//   }
// });

// // Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// // Start the server
// app.listen(PORT, () => console.log(`App running on https://localhost:${PORT}`));

// Import necessary modules
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const favicon = require("serve-favicon");
const path = require("path");
const helmet = require("helmet");

// Initialize the express application
const app = express();

// Configure Helmet for basic security enhancements
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://www.gstatic.com", "https://api.themoviedb.org", "https://*.youtube.com"],
      connectSrc: ["'self'", "https://api.themoviedb.org"],
      frameSrc: ["'self'", "https://www.google.com", "https://*.youtube.com"]
    }
  }
}));

// Middleware to enforce HTTPS redirect
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// CORS configuration to allow requests from your domain
app.use(cors({
  origin: 'https://reelreviews.info'
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, "client/build"))); // Serve static files from the React app build directory
app.use(express.static("public")); // Serve other static files
app.use(favicon(path.join(__dirname, "./client/public/", "imgs", "film-reel.png"))); // Serve the favicon

// POST endpoint to send emails
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "reelreviewstest@gmail.com",
      pass: "halyoqyczhmgbxrd"
    },
  });

  const mailOptions = {
    from: "reelreviewstest@gmail.com",
    to: "lchan2021@csu.fullerton.edu",
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  try {
    let emailResult = await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).send("Failed to send email");
  }
});

// Fallback for all other GET requests to serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Set up the server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`App running on https://localhost:${PORT}`));
