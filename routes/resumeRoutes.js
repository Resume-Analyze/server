const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const resumeController = require('../resume/controller')

// Action crud 
router.post('/upload', upload.single("pdfFile"), resumeController.uploadResume);

module.exports = router;