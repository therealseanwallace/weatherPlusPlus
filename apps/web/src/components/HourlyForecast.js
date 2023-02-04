import React from "react";
import returnWeatherIcon from "../helpers/returnWeatherIcon";
import convertTimesFromUnix from "../helpers/convertTimesFromUnix";

const HourlyForecast = (props) => {
  console.log("hourly forecast props are: ", props);
  const img = returnWeatherIcon([props.forecast.weather[0].id, props.sunrise, props.sunset, props.dt]);
  return (
    <div className="hourly-forecast">
      <h3>Time: {convertTimesFromUnix(props.forecast.dt, props.timezoneOffset)}</h3>
      <img src={img} alt="" className="hourly-forecast-icon"/>
      <h3>Temp: {props.forecast.temp}</h3>
    </div>
  )
}

export default HourlyForecast;