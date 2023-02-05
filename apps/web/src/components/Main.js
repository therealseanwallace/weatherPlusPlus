import React, { useState, useEffect } from "react";
import Input from "./Input";
import getWeather from "../helpers/getWeather";
import CurrentWeather from "./CurrentWeather";
import HourlyForecastContainer from "./HourlyForecastContainer";
import DailyForecastContainer from "./DailyForecastContainer";
import AirQuality from "./AirQuality";

const Main = () => {
  let [name, setName] = useState("");
  let [country, setCountry] = useState("");
  let [region, setRegion] = useState("");
  let [weather, setWeather] = useState(false);
  let [preferredUnit, setPreferredUnit] = useState("metric");

  async function submitLocation(e) {
    e.preventDefault();
    const newWeather = await getWeather(name, country, region);
    setWeather(await newWeather);
  }
  useEffect(() => {
  console.log('main - weather is: ', weather);
  }, [weather])

  if (!weather) {
    return (
      <div className="main-container">
        <div className="upper-container">
          <Input submitLocation={submitLocation} 
            setName={setName}
            setCountry={setCountry}
            setRegion={setRegion}
            name={name}
            country={country}
            region={region}
          />
        </div>
      </div>
    )
  } else {

    return (
      <div className="main-container">
        <div className="upper-container">
          <Input submitLocation={submitLocation} 
            setName={setName}
            setCountry={setCountry}
            setRegion={setRegion}
            name={name}
            country={country}
            region={region}
          />
          <CurrentWeather 
            location={weather.cityName}
            currentWeather={weather.current}
            high={weather.daily[0].temp.max}
            low={weather.daily[0].temp.min}
            preferredUnit={preferredUnit}
          />
          <AirQuality 
            airQuality={weather.pollution.list[0]}
            timezoneOffset={weather.timezoneOffset}
          />
        </div>
        <div className="lower-container">
          <HourlyForecastContainer
            weather = {weather}
            hourly={weather.hourly}
            sunrise = {weather.current.sunrise}
            sunset = {weather.current.sunset}
            dt={weather.current.dt}
            preferredUnit={preferredUnit}
          />
          <DailyForecastContainer 
            daily = {weather.daily}
            preferredUnit={preferredUnit}
            timezoneOffset={weather.timezoneOffset}
          />
        </div>
      </div>
    )
  }

};

export default Main;
