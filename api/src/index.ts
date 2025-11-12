import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.js';
import bookingRouter from './routes/bookings.js';


const app = express();

// 🔒 Security & middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(rateLimit({ windowMs: 60_000, max: 60 })); // 60 requests/minute per IP

app.get('/health', (_req, res) => res.json({ ok: true }));

// 🧩 Routes
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingRouter);

// ⚙️ Server + DB
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

