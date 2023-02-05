import React from "react";
import returnWeatherIcon from "../helpers/returnWeatherIcon";
import convertTemps from "../helpers/convertTemps";
import getDayAndTime from "../helpers/getDayAndTime";

const DailyForecast = (props) => {
  console.log('daily forecast props are: ', props);
  console.log('daily forecast props.forecast is: ', props.forecast);
  const sunrise = getDayAndTime(props.forecast.sunrise, props.timezoneOffset);
  const sunset = getDayAndTime(props.forecast.sunset, props.timezoneOffset);
  console.log('sunrise is: ', sunrise);
  console.log('sunset is: ', sunset);
  const dayAndTime = getDayAndTime(props.dt, props.timezoneOffset);
  const { day } = dayAndTime;
  return (
    <div className="daily-forecast">
      <h3>{`${day}`}</h3>
      <img
        src={returnWeatherIcon([
          props.forecast.weather[0].id,
          props.sunrise,
          props.sunset,
          props.dt,
        ])}
        alt=""
        className="daily-forecast-icon"
      />
      <h3>{props.forecast.weather[0].description}</h3>
      <h3>Max: {convertTemps(props.forecast.temp.max, props.preferredUnit)}</h3>
      <h3>Min: {convertTemps(props.forecast.temp.min, props.preferredUnit)}</h3>
      <h3>UV: {props.forecast.uvi}</h3>
      <h3>Humidity: {props.forecast.humidity} %</h3>
      <h3>Sunrise: {sunrise.time}</h3>
      <h3>Sunset: {sunset.time}</h3>
      
    </div>
  )
}

export default DailyForecast;