import cors from 'cors';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import { helmetConfig } from './server/middlewares/helmetConfig.js';

import { httpsRedirect } from "./server/middlewares/httpsRedirect.js";
import { staticFiles } from "./server/middlewares/staticFiles.js";
import { getReviews } from "./server/routes/getReviews.js";
import { sendEmail } from "./server/routes/sendEmail.js";
import { fallback } from "./server/routes/fallback.js";
import { scrapeReddit } from "./server/utils/scrapeReddit.js";
import { autoScroll } from "./server/utils/autoScroll.js";

// Convert the file URL to a path and get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the express application
const app = express();

// Apply CORS middleware
app.use(cors());

// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Set up the server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
