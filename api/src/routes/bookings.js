import { Schema, model } from 'mongoose';
const bookingSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    date: { type: String, required: true }, // yyyy-mm-dd
    time: { type: String, required: true }, // hh:mm
    reason: { type: String, required: true, trim: true, maxlength: 500 },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });
// Prevent duplicate date/time bookings
bookingSchema.index({ date: 1, time: 1 }, { unique: true });
export default model('Booking', bookingSchema);
//# sourceMappingURL=bookings.js.map