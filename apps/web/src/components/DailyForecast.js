import React from "react";
import returnWeatherIcon from "../helpers/returnWeatherIcon";

const DailyForecast = (props) => {
  console.log('daily forecast props are: ', props);
  console.log('daily forecast props.forecast is: ', props.forecast);
  let max;
  let min;
  let sunrise;
  let sunset;

  if (props.preferredUnit === "metric") {
    max = props.forecast.max.metric;
    min = props.forecast.min.metric;
    sunrise = props.forecast.sunrise.time24;
    sunset = props.forecast.sunset.time24;
  } else {
    max = props.forecast.max.imperial;
    min = props.forecast.min.imperial;
    sunrise = props.forecast.sunrise.time12;
    sunset = props.forecast.sunset.time12;
  }
  return (
    <div className="daily-forecast">
      <h3>{props.forecast.dt.day}</h3>
      <img
        src={returnWeatherIcon([
          props.forecast.id,
          props.forecast.sunrise.dt,
          props.forecast.sunset.dt,
          props.dt.dt,
        ])}
        alt=""
        className="daily-forecast-icon"
      />
      <h3>{props.forecast.description}</h3>
      <h3>Max: {max}</h3>
      <h3>Min: {min}</h3>
      <h3>UVI: {props.forecast.uvi}</h3>
      <h3>Humidity: {props.forecast.humidity} %</h3>
      <h3>Sunrise: {sunrise}</h3>
      <h3>Sunset: {sunset}</h3>
      
    </div>
  )
}

export default DailyForecast;