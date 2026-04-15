const express = require("express");
const http = require("http"); // Native Node module
const cors = require("cors");
const connectDB = require("./config/db");
const { initSocket } = require("./sockets/logStreamer"); // WebSocket importer
require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app); // Express app ko HTTP server mein wrap kiya

// Middleware
app.use(cors());
app.use(express.json());

// Initialize WebSockets
initSocket(server);

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/deployments", require("./routes/deploymentRoutes"));
//web hooks
app.use("/api/webhooks", require("./routes/webhookRoutes"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Smart DevOps Backend running on port ${PORT}`);
});
