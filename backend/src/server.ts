import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// express instance
const app = express();

// load dotenv files
dotenv.config();

// Middleware to Handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// api routes
// app.use("/api/v1/auth", authRoutes)

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
