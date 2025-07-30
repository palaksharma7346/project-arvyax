require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes"); // ✅ Add this line
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

//middleware to handle cors
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/auth", authRoutes);

//serve uploaded images
app.use((req, res) => {
    console.log("❌ Route not found:", req.originalUrl);
    res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));