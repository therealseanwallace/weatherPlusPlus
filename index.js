import mongoose from "mongoose";
import express from "express";
import weatherRouter from "./routes/weatherRouter.js";

const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!" + new Date());
  res.send("pong");
});

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Mongoose //

const MONGO_URL = "mongodb://localhost:27017/Weather";

async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  } finally {
    console.log("Connected to MongoDB");
  }
}

connect();