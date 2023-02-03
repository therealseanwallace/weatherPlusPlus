import React from "react";
import HourlyForecast from "./HourlyForecast";

const HourlyForecastContainer = (props) => {
  console.log("hourly forecast container props are: ", props);
  return (
    <div className={"hourly-forecast-container"}>
      {props.hourly.map((forecast) => {
        return (
          <div key={forecast.dt}>
            <HourlyForecast
              forecast={forecast}
              preferredUnit={props.preferredUnit}
              sunrise={props.sunrise}
              sunset={props.sunset}
              dt={props.dt}
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
