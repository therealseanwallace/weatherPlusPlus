import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  a_string: String,
  a_date: Date,
});

const WeatherSchema = new Schema({
  cityName: String,
  latitude: Number,
  longitude: Number,
  current: Object,
  timezone: String,
  timezoneOffset: Number,
  timestamp: Number,
  current: Object,
  hourly: Object,
  daily: Object,
  alerts: Object,
  pollution: Object,
});

export const WeatherModel = mongoose.model("Weather", WeatherSchema);
