const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://doctor-appointment-system.vercel.app' 
    : 'http://localhost:5173'
}));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/admin", require("./routes/adminRoutes.js"));
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/appoint", require("./routes/bookingRoutes.js"));
app.use("/api/doctor", require("./routes/doctorRoutes.js"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
  });
}

// Export for Vercel
module.exports = app;
