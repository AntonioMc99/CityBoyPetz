import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:mm
    reason: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

// prevent double-booking same date + time
bookingSchema.index({ date: 1, time: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

// 🔑 default export – this line fixes the error
export default Booking;
