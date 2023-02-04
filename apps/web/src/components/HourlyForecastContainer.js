import React from "react";
import HourlyForecast from "./HourlyForecast";
import convertTimesFromUnix from "../helpers/convertTimesFromUnix";

const HourlyForecastContainer = (props) => {
  console.log("hourly forecast container props are: ", props);
  return (
    <div className={"hourly-forecast-container"}>
      {props.hourly.map((forecast) => {
        const time = convertTimesFromUnix(forecast.dt, props.weather.timezoneOffset)
        return (
          <div key={forecast.dt}>
            <HourlyForecast
              forecast={forecast}
              preferredUnit={props.preferredUnit}
              sunrise={props.sunrise}
              sunset={props.sunset}
              time={time}
            />
          </div>
        );
      })}
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
