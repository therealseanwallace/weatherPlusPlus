import React from "react";

// converts between Kelvin, Celsius, and Fahrenheit - 
// see https://www.npmjs.com/package/node-temperature-converter for details

const CurrentWeather = (props) => {
  console.log('current weather props are: ', props);
  const cityName = props.location;
  let temp;
  let max;
  let min;
  let vis;
  let sunrise;
  let sunset;
  let windspeed

  if (props.preferredUnit === "metric") {
    temp = props.currentWeather.temp.metric;
    max = props.currentWeather.max.metric;
    min = props.currentWeather.min.metric;
    vis = props.currentWeather.visibility.metric;
    sunrise = props.currentWeather.sunrise.time24;
    sunset = props.currentWeather.sunset.time24;
    windspeed = props.currentWeather.wind.speed.metric;
  }
  return (
    <div className="current-weather-container">
      <h3>{cityName}</h3>
      <h2>{temp}</h2>
      <h3>{}</h3>
      <div>
        <h3>{max}</h3>
        <h3>{min}</h3>
      </div>
      <div className="uv-container">
        <h3>UV</h3>
        <h3>{props.currentWeather.uvi}</h3>
      </div>
      <div className="vis-container">
        <h3>Visibility:</h3>
        <h3>{vis}</h3>
      </div>
      <div className="humidity-container">
        <h3>Humidity:</h3>
        <h3>{props.currentWeather.humidity}%</h3>
      </div>
      <div className="sunriseSunset-container">
        <h3>Sunrise:</h3>
        <h3>{sunrise}</h3>
        <h3>Sunset:</h3>
        <h3>{sunset}</h3>
      </div>
      <div className="wind-container">
        <h3>Windspeed: {windspeed}</h3>
        <h3>Wind Direction: {props.currentWeather.wind.dir}</h3>

      </div>
    </div>
  )
}

export default CurrentWeather;
