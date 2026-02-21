import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is running (no database mode)" });
});

// Bookings route placeholder
app.get("/api/bookings", (req, res) => {
  res.json([]); // empty list for now
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT} (no database mode)`);
});
