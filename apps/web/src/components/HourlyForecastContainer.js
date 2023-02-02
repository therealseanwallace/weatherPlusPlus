import React from "react";
import HourlyForecast from "./HourlyForecast";

const HourlyForecastContainer = (props) => {
  console.log("hourly forecast container props are: ", props);
  return (
    <div className="hourly-forecast-container">
      {props.hourly.map((forecast) => {
        console.log('forecast is: ', forecast);
        //return <HourlyForecast forecast={forecast} key={forecast.dt} />;
      })}
    </div>
  );
};

export default HourlyForecastContainer;
