import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  a_string: String,
  a_date: Date,
});

const WeatherSchema = new Schema({
  cityId: Number,
  latitude: Number,
  longitude: Number,
  timestamp: Number,
  cityName: String,
  country: String,
  state: String,
  weatherId: Number,
  description: String,
  temp: Number,
  temp_min: Number,
  temp_max: Number,
  pressure: Number,
  humidity: Number,
  wind_speed: Number,
  wind_deg: Number,
  wind_gust: Number,
  clouds: Number,
  rain1h: Number,
  rain3h: Number,
  snow1h: Number,
  snow3h: Number,
  sunrise: Number,
  sunset: Number,
  timezone: Number,
  aqi: Number,
  co: Number,
  no: Number,
  no2: Number,
  ozone: Number,
  so2: Number,
  pm25: Number,
  pm10: Number,
  nh3: Number,
});

export const WeatherModel = mongoose.model("Weather", WeatherSchema);
