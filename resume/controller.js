const multer = require("multer");
const pdfParse = require("pdf-parse");

// Multer Configuration (Store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        const pdfData = await pdfParse(req.file.buffer)
        // Example: Get text content from PDF
        const text = pdfData.text;
        // Respond with extracted text
        res.json({ extractedText: text });
    } catch (err) {
        err.scope = err.scope || 'uploadResume';
        throw err;
    }
}

module.exports = {
    uploadResume
}