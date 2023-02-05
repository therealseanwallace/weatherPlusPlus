import React from "react";
import returnWeatherIcon from "../helpers/returnWeatherIcon";
import convertTemps from "../helpers/convertTemps";
import getDayAndTime from "../helpers/getDayAndTime";

const HourlyForecast = (props) => {
  const dayAndTime = getDayAndTime(props.dt, props.timezoneOffset);
  //console.log("hourly forecast props are: ", props);
  const { day, time } = dayAndTime;
  return (
    <div className="hourly-forecast">
      <h3>{`${day}, ${time}`}</h3>
      <img
        src={returnWeatherIcon([
          props.forecast.weather[0].id,
          props.sunrise,
          props.sunset,
          props.dt,
        ])}
        alt=""
        className="hourly-forecast-icon"
      />
      <h3>{convertTemps(props.forecast.temp, props.preferredUnit)}</h3>
    </div>
  );
};

export default HourlyForecast;
