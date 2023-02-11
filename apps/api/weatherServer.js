/* eslint-disable no-console */
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weatherRouter.js';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

const PORT = 3001;

app.use('/public', express.static('public'));

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
  message: 'Too many requests from this IP, please try again shortly.',
});

app.use('/api', apiRequestLimiter);

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((_req, res) => {
  res.status(404).send("Sorry can't find that!")
})

// Mongoose //

const MONGO_URL = process.env.MONGO_URL;

async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error.message);
  } finally {
    console.log('Connected to MongoDB');
  }
}

connect();
