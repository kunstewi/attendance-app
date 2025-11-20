require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// express instance
const app = express();

// middleware to handle cors
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// middleware to parse json
app.use(express.json());

// connect db
connectDB();

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));