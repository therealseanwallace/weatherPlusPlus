import React from "react";
import returnWeatherIcon from "../helpers/returnWeatherIcon";
import convertTemps from "../helpers/convertTemps";

const HourlyForecast = (props) => {
  console.log("hourly forecast props are: ", props);
  const dateHuman = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "CET",
  }).format((props.dt + props.timezoneOffset) * 1000);
  const day = dateHuman.split(",")[0];
  console.log('day is: ', day);

  // gets the time from the dateHuman string using regex
  const time = dateHuman.match(/(\d{1,2}:\d{2})/g)[0];
  console.log('time is: ', time);
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
