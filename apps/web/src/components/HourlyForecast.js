import React from "react";

const HourlyForecast = (props) => {

  return (
    <div className="hourly-forecast">
      <h3>Time: {props.forecast.dt}</h3>
      <h3>ID: {props.forecast.weather[0].id}</h3>
      <h3>Temp: {props.forecast.temp}</h3>
    </div>
  )
}

export default HourlyForecast;