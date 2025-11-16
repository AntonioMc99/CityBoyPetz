import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRouter from "./routes/bookings.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// simple test route
app.get("/", (req, res) => {
  res.json({ message: "CityBoyPetz API is running 🐍" });
});

// bookings routes
app.use("/api/bookings", bookingsRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

