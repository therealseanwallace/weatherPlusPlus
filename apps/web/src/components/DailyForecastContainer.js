import React from "react";

import DailyForecast from "./DailyForecast";

const DailyForecastContainer = (props) => {
  console.log("daily forecast container props are: ", props);
  return (
    <div className={"daily-forecast-outer-container future-forecast-outer-container"}>
      <h2>Daily</h2>
      <div className={"daily-forecast-inner-container future-forecast-inner-container"}>
        {props.daily.map((forecast) => {
          return (
            <div key={forecast.dt}>
              <DailyForecast
                forecast={forecast}
                dt={forecast.dt}
                preferredUnit={props.preferredUnit}
                icon = {forecast.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyForecastContainer;
