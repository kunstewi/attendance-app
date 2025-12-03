import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "./config/corsConfig.js";

// express instance
const app = express();

// load dotenv files
dotenv.config();

// handle cors
app.use(cors(corsOptions))


