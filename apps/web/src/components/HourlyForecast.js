import React from "react";
import returnWeatherIcon from "../helpers/returnWeatherIcon";

const HourlyForecast = (props) => {
  console.log("hourly forecast props are: ", props);
  let time;
  let temp;
  if (props.preferredUnit === "metric") {
    time = props.dt.time24;
    temp = props.forecast.temp.metric;
  } else {
    time = props.dt.time12;
    temp = props.forecast.temp.imperial;
  }
  return (
    <div className="hourly-forecast">
      <h3>{`${props.dt.day}, ${time}`}</h3>
      <img
        src={returnWeatherIcon([
          props.forecast.id,
          props.sunrise.dt,
          props.sunset.dt,
          props.dt,
        ])}
        alt=""
        className="hourly-forecast-icon"
      />
      <h3>{temp}</h3>
    </div>
  );
};

export default HourlyForecast;
