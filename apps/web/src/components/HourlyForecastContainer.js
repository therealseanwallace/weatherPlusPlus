import React from "react";
import HourlyForecast from "./HourlyForecast";

const HourlyForecastContainer = (props) => {
  console.log("hourly forecast container props are: ", props);
  return (
    <div className={"hourly-forecast-outer-container future-forecast-outer-container"}>
      <h2>Hourly</h2>
      <div className={"hourly-forecast-inner-container future-forecast-inner-container"}>
        {props.hourly.map((forecast) => {
          console.log(
            "mapping over hourly forecast, forecast.dt is: ",
            forecast.dt
          );
          return (
            <div key={forecast.dt.dt}>
              <HourlyForecast
                forecast={forecast}
                preferredUnit={props.preferredUnit}
                sunrise={props.sunrise}
                sunset={props.sunset}
                dt={forecast.dt}
                timezone={props.weather.timezone}
                timezoneOffset={props.weather.timezoneOffset}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecastContainer;

/*

forecast.dt

<div key={key}>
                    <TaskCard
                      completeTask={this.props.completeTask}
                      task={task}
                      onChange={this.props.onChange}
                      tasklist={this.props.tasks}
                      deleteTask={this.props.deleteTask}
                    />
                  </div>
*/
