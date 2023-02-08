/* eslint-disable no-console */
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weatherRouter.js';
import rateLimit from 'express-rate-limit';

const app = express();

/*const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};*/

app.use(cors());
app.use(express.json());

const PORT = 3001;
const whitelist = ['http://localhost:3000'];


app.use('/public', express.static('public'));

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
  message: 'Too many requests from this IP, please try again shortly.',
});

app.use('/api', apiRequestLimiter);

app.get('/ping', (_req, res) => {
  console.log(`someone pinged here!!${new Date()}`);
  res.send('pong');
});

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Mongoose //

const MONGO_URL = 'mongodb://localhost:27017/Weather';

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
