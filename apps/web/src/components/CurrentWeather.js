import React from "react";
import getDayAndTime from "../helpers/getDayAndTime";

// converts between Kelvin, Celsius, and Fahrenheit - 
// see https://www.npmjs.com/package/node-temperature-converter for details
const Converter = require("node-temperature-converter");

const CurrentWeather = (props) => {
  const preferredUnit = props.preferredUnit;
  const cityName = props.location;
  const currentTempConverter = new Converter.Kelvin(props.currentWeather.temp);
  const currentHighConverter = new Converter.Kelvin(props.high);
  const currentLowConverter = new Converter.Kelvin(props.low);
  const currentWeatherDescription = props.currentWeather.weather[0].description;
  let currentTemp;
  let currentHigh;
  let currentLow;
  if (preferredUnit === "metric") {
    currentTemp = currentTempConverter.toCelsius().toFixed(0) + "°C";
    currentHigh = currentHighConverter.toCelsius().toFixed(0) + "°C";
    currentLow = currentLowConverter.toCelsius().toFixed(0) + "°C";
  } else if (preferredUnit === "imperial") {
    currentTemp = currentTempConverter.toFahrenheit().toFixed(0) + "°F";
    currentHigh = currentHighConverter.toFahrenheit().toFixed(0) + "°F";
    currentLow = currentLowConverter.toFahrenheit().toFixed(0) + "°F";
  } else {
    currentTemp = currentTempConverter.toKelvin().toFixed(0) + "°K";
    currentHigh = currentHighConverter.toKelvin().toFixed(0) + "°K";
    currentLow = currentLowConverter.toKelvin().toFixed(0) + "°K";
  }

  let visibility = props.currentWeather.visibility;

  if (visibility >= 10000 && props.preferredUnit === "metric") {
    visibility = visibility + "+ meters";
  } else if (visibility >= 10000 && props.preferredUnit === "imperial") {
    visibility = (visibility * 1.09361) + "+ yards";
  } else if (visibility < 10000 && props.preferredUnit === "metric") {
    visibility = visibility + " meters";
  } else {
    visibility = (visibility * 1.09361) + " yards";
  }
  return (
    <div className="current-weather-container">
      <h3>{cityName}</h3>
      <h2>{currentTemp}</h2>
      <h3>{currentWeatherDescription}</h3>
      <div>
        <h3>{currentHigh}</h3>
        <h3>{currentLow}</h3>
      </div>
      <div className="uv-container">
        <h3>UV</h3>
        <h3>{props.currentWeather.uvi}</h3>
      </div>
      <div className="vis-container">
        <h3>Visibility:</h3>
        <h3>{visibility}</h3>
      </div>
      <div className="humidity-container">
        <h3>Humidity:</h3>
        <h3>{props.currentWeather.humidity}%</h3>
      </div>
      <div className="sunriseSunset-container">
        <h3>Sunrise:</h3>
        <h3>{getDayAndTime(props.currentWeather.sunrise, props.timezoneOffset).time}</h3>
        <h3>Sunset:</h3>
        <h3>{getDayAndTime(props.currentWeather.sunset, props.timezoneOffset).time}</h3>
      </div>
    </div>
  )
}

export default CurrentWeather;


/* <h3 className="location">{cityName}</h3>
      <h2 className="current-temp">{currentWeather}</h2>
      <h3 className="current-weather-description">{props.currentWeather.weather[0].description}</h3>
      <div className="current-high-low-container">
        <h3 className="current-high">{props.high}</h3>
        <h3 className="current-low">{props.low}</h3>
      </div> */