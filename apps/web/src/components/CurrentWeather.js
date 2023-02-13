import React from "react";

// converts between Kelvin, Celsius, and Fahrenheit -
// see https://www.npmjs.com/package/node-temperature-converter for details

const CurrentWeather = (props) => {
  console.log("current weather props are: ", props);
  const cityName = props.location;
  let temp;
  let max;
  let min;
  let vis;
  let sunrise;
  let sunset;
  let windspeed;

  if (props.preferredUnit === "metric") {
    temp = props.currentWeather.temp.metric;
    max = props.currentWeather.max.metric;
    min = props.currentWeather.min.metric;
    sunrise = props.currentWeather.sunrise.time24;
    sunset = props.currentWeather.sunset.time24;
    windspeed = props.currentWeather.wind.speed.metric;
  } else {
    temp = props.currentWeather.temp.imperial;
    max = props.currentWeather.max.imperial;
    min = props.currentWeather.min.imperial;
    sunrise = props.currentWeather.sunrise.time12;
    sunset = props.currentWeather.sunset.time12;
    windspeed = props.currentWeather.wind.speed.imperial;
  }

  return (
    <div className="current-weather-container">
      <h3 className="current-weather-name">{cityName}</h3>
      <div className="toggle-container">
        <p>Units: </p>
        <label className="switch">
          <input type="checkbox" onClick={props.toggleUnits} />
          <span className="slider" />
        </label>
      </div>

      <h2 className="current-weather-temp">{temp}</h2>
      <h3 className="current-weather-desc">
        {props.currentWeather.weather.description}
      </h3>
      <div className="current-weather-high-low">
        <h3>⬆️ {max}</h3>
        <h3>⬇️ {min}</h3>
      </div>
      <div className="current-weather-sunrise-sunset">
        <h3>🌅</h3>
        <h3>{sunrise}</h3>
        <h3>🌇</h3>
        <h3>{sunset}</h3>
      </div>
      <div className="wind-container">
        <h3>
          🌬️ {windspeed} {props.currentWeather.wind.dir}{" "}
        </h3>
      </div>
      <div className="current-weather-uv">
        <h3>UV:</h3>
        <h3>{props.currentWeather.uvi}</h3>
      </div>
      <div className="current-weather-vis-humidity">
        <div className="current-weather-humidity">
          <h3>Humidity: {props.currentWeather.humidity}%</h3>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
