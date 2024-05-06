// Import necessary modules
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import nodemailer from "nodemailer";
import helmet from "helmet";
import favicon from "serve-favicon";
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message.js');
const { isRealString } = require('./utils/validation.js');
const { Users } = require('./utils/users.js');
const publicPath = path.join(__dirname, '../public');

// Initialize the express application
const app = express();
const server = http.createServer(app);
app.use(express.static(publicPath));

let io = socketIO(server);
let users = new Users();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Serve static files (assuming public directory for static files and React build)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// SOCKET IO FOR CHATROOM
io.on('connection', (socket) => {

  socket.on('leave', (params) => {
      socket.leave(params.room);
  });

  socket.on('join', (params, callback) => {

      if (!isRealString(params.name) || !isRealString(params.room)) {
          return callback('Bad request');
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin', params.room, 'Welcome to the chat app.'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.room, `${params.name} has joined.`));

      callback();
  });

  socket.on('createMessage', (message, callback) => {
      var user = users.getUser(socket.id);
      if (user && isRealString(message.text)) {
          let tempObj = generateMessage(user.name, user.room, message.text);
          io.to(user.room).emit('newMessage', tempObj);
          callback({
              data: tempObj
          });
      }
      callback();
  });

  socket.on('createLocationMsg', (coords) => {
      var user = users.getUser(socket.id);
      if (user) {
          io.to(user.room).emit('createLocationMsg', generateLocationMessage(user.name, user.room, coords.lat, coords.lon));
      }
  });

  socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);

      if (user) {
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', user.room, `${user.name} has left.`));
      }
  });

});

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

// CORS configuration to allow requests from allowed origins
// app.use(cors({
//   origin: ['http://localhost:3000']
// }));

app.use(cors())

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

// Function to scrape Reddit for reviews
async function scrapeReddit(movieName, releaseDate) {
  const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      userDataDir: "./tmp"
  });
  const page = await browser.newPage();
  const query = `site:reddit.com review movie ${movieName} ${releaseDate}`;
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);

  let comments = [];
  let linksVisited = 0;
  let threadLinks = [];
  while (comments.length < 50 && linksVisited < 10) {
      if (threadLinks.length === 0) {
          threadLinks = await page.evaluate(() => Array.from(document.querySelectorAll("a[href*='reddit.com/r/']")).map(anchor => anchor.href));
      }
      if (linksVisited >= threadLinks.length) break;

      const nextLink = threadLinks[linksVisited++];
      console.log(`Navigating to: ${nextLink}`);
      try {
          await page.goto(nextLink);
          await autoScroll(page);
          const newComments = await page.evaluate(() => Array.from(document.querySelectorAll('div[id*="-post-rtjson-content"] p'), element => element.textContent.trim()));
          comments = [...comments, ...newComments.slice(0, 50 - comments.length)];
          console.log(`Total comments collected: ${comments.length}`);
      } catch (error) {
          console.error(`Error navigating to link: ${error}`);
          continue;
      }
  }
  await browser.close();
  return comments;
}

// Auto-scroll function to load all comments
async function autoScroll(page) {
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          let totalHeight = 0;
          let distance = 100;
          let timer = setInterval(() => {
              let scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;
              if (totalHeight >= scrollHeight) {
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}

// Handle form submission and call the scrape function
app.post("/get-reviews", async (req, res) => {

  console.log(req.body);  // Log the body to debug it
  res.json({ message: "Data received", data: req.body }); // Echo back the received data for debugging

  // const { movieName, releaseDate } = req.body;
  // try {
  //     const comments = await scrapeReddit(movieName, releaseDate);
  //     res.json({ comments });
  // } catch (error) {
  //     res.status(500).send("An error occurred while fetching reviews.");
  // }
});

// Send email endpoint using nodemailer
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
      await transporter.sendMail(mailOptions);
      res.json({ message: "Email sent successfully" });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
  }
});

// Fallback for other GET requests not handled by specific routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


// Set up the server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`App running on https://localhost:${PORT}`));
