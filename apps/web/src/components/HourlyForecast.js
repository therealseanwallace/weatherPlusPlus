import React from "react";
import returnWeatherIcon from "../helpers/returnWeatherIcon";

const HourlyForecast = (props) => {
  console.log("hourly forecast props are: ", props);
  const img = returnWeatherIcon([props.forecast.weather[0].id, props.sunrise, props.sunset, props.dt]);
  return (
    <div className="hourly-forecast">
      <h3>Time: {props.forecast.dt}</h3>
      <h3>ID: {props.forecast.weather[0].id}</h3>
      <img src={img} alt="" />
      <h3>Temp: {props.forecast.temp}</h3>
    </div>
  )
}

export default HourlyForecast;