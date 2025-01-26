require("dotenv").config();
const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes");
const trackingMiddleware = require("./middlewares/trackingMiddleware");
const fileRoutes = require('./routes/fileRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "*",
  })
);

// Applying middleware for all routes
app.use(trackingMiddleware);

// Feedback routes
app.use("/server/api", feedbackRoutes);

// Files routes
app.use('/server/api', fileRoutes);

// auth routes
app.use('/server/api', authRoutes);

// Start server
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
