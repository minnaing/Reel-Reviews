import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Use import.meta.url to get the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const staticFiles = [
  express.static(path.join(__dirname, "../../client/public")),
  express.static(path.join(__dirname, "../../client/build"))
];
