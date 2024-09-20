const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { promisify } = util;
const multer = require('multer');
const cors = require("cors");

const icalToJSON = require('./lib/icalToJSON');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Define the directory where your videos will be stored
const uploadDirectory = './data/uploads';

// Promisify fs.stat for asynchronous file system operations
const stat = promisify(fs.stat);

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Function to check if a file is compatible (you can extend this based on your needs)
function isFileCompatible(file) {
    console.log("check file compatibility", file)
  return file.filename.endsWith('.ics') || file.filename.endsWith('.csv');
}


// Route to upload videos
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (isFileCompatible(req.file)) {
        const data = await icalToJSON(req.file);
        res.json(data);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
