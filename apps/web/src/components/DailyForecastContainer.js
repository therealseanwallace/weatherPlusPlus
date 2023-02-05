import React from "react";

import DailyForecast from "./DailyForecast";

const DailyForecastContainer = (props) => {
  console.log("daily forecast container props are: ", props);
  return (
    <div className={"hourly-forecast-container"}>
      {props.daily.map((forecast) => {
        return (
          <div key={forecast.dt}>
            <DailyForecast
              forecast={forecast}
              preferredUnit={props.preferredUnit}
              dt={forecast.dt}
              timezoneOffset={props.timezoneOffset}
            />
          </div>
        );
      })}
    </div>
  );
};
export default DailyForecastContainer;
