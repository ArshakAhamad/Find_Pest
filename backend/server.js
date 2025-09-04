const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { testConnection } = require("./config/database");
require("dotenv").config();

// Import routes
const pestRoutes = require("./routes/pests");
const detectionRoutes = require("./routes/detection");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Find Pest API Server",
    status: "running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      pests: "/api/pests",
      detection: "/api/detection",
    },
  });
});

// Health check
app.get("/api/health", async (req, res) => {
  const dbStatus = await testConnection();
  res.json({
    status: "Server running successfully",
    timestamp: new Date().toISOString(),
    database: dbStatus ? "Connected" : "Connection failed",
  });
});

// Use routes
app.use("/api/pests", pestRoutes);
app.use("/api/detection", detectionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

const startServer = async () => {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test endpoints:`);
    console.log(`- GET http://localhost:${PORT}/api/pests`);
    console.log(`- GET http://localhost:${PORT}/api/pests/1`);
    console.log(`- POST http://localhost:${PORT}/api/detection/analyze`);
  });
};

startServer();
