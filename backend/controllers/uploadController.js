const fs = require('fs');
const path = require('path');

exports.uploadJson = async (req, res) => {
  try {
    const sessionJson = req.body;

    if (!sessionJson.title || !sessionJson.steps) {
      return res.status(400).json({ message: 'Invalid JSON structure' });
    }

    const fileName = `${Date.now()}-${sessionJson.title.replace(/\s+/g, '-')}.json`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    // Ensure uploads/ exists
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(filePath, JSON.stringify(sessionJson, null, 2));

    const fileUrl = `http://localhost:8000/uploads/${fileName}`;
    res.status(200).json({ json_file_url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload JSON', error: error.message });
  }
};
