const express = require("express");
const router = express.Router();
const { uploadJson } = require("../controllers/uploadController");
const {protect} = require("../middleware/authMiddleware");

router.post("/json", protect, uploadJson);

module.exports = router;
