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
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://www.gstatic.com", 
        "https://apis.google.com",  // Required for Google API Loader and other Google scripts
        "https://www.google.com",  // For Google Charts and potentially Google Maps
        "https://maps.googleapis.com"  // To allow Google Maps scripts
      ],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://fonts.googleapis.com",
        "https://www.gstatic.com",  // For styles loaded by Google Charts
      ],
      fontSrc: [
        "'self'", 
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'", 
        "data:", 
        "https://www.gstatic.com",  // For Google Charts or other Google services
        "https://api.themoviedb.org", 
        "https://image.tmdb.org",  // For images from TMDb
        "https://maps.googleapis.com",  // Adding Google Maps images source
        "https://maps.gstatic.com",  // Added this for images from Google Maps
        "https://lh3.googleusercontent.com",  // Allow images from Google user content
        "https://placehold.co/600x400?text=No Image Available"
      ],
      connectSrc: [
        "'self'", 
        "https://api.themoviedb.org",
        "https://*.googleapis.com",  // Include this for Google Maps and other API services
      ],
      frameSrc: [
        "'self'", 
        "https://www.google.com",  // If you are using iframes for Google services
        "https://*.youtube.com"
      ],
      objectSrc: ["'none'"],  // Generally a good idea to lock down object sources
      baseUri: ["'self'"]  // Lock down the base URI for document bases
    }
  },
  // This will disable CSP for browsers that still use CSP 1.0
  contentSecurityPolicyReportOnly: false
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
