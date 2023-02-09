import React, { useState, useEffect } from "react";
import Input from "./Input";
import getWeather from "../helpers/getWeather";
import CurrentWeather from "./CurrentWeather";
import HourlyForecastContainer from "./HourlyForecastContainer";
import DailyForecastContainer from "./DailyForecastContainer";
import { useRef } from "react";

const Main = () => {
  let [name, setName] = useState("");
  let [country, setCountry] = useState("");
  let [region, setRegion] = useState("");
  let [weather, setWeather] = useState(false);
  let [preferredUnit, setPreferredUnit] = useState("metric");
  const isInitialMount = useRef(true);

  async function submitLocation(e) {
    e.preventDefault();
    const newWeather = await getWeather(name, country, region);
    console.log('weather retrieved by main. newWeather is: ', newWeather);
    setWeather(await newWeather);
    
  }

  const showStateifUS = () => {
    const country = document.querySelector(".crs-country");
    if (country.value === "US") {
      document.querySelector(".crs-state").classList.toggle("hidden");
    }
    if (country.value !== "US") {
      document.querySelector(".crs-state").classList.toggle("hidden");
    }
    document.querySelector(".crs-state-spacer").classList.toggle("hidden");
  };

  useEffect(() => {
    console.log("main - weather is: ", weather);  
  }, [weather]);

  useEffect(() => {
    if (isInitialMount.current) {
       isInitialMount.current = false;
    } else {
      showStateifUS();
    }
  }, [country]);

  if (!weather) {
    return (
      <div className="main-container">
        <div className="upper-container">
          <Input
            submitLocation={submitLocation}
            setName={setName}
            setCountry={setCountry}
            setRegion={setRegion}
            name={name}
            country={country}
            region={region}
          />
        </div>
      </div>
    );
  } else if (weather === 429 || weather === 404) {
    let errorMessage;
    if (weather === 429) {
      errorMessage = "Too many requests from this IP, please try again shortly.";
    } else if (weather === 404) {
      errorMessage = "Location not found, please try again. Please ensure that you typed the city name correctly and that you selected the correct country.";
    }
    return (
      <div className="main-container">
        <div className="upper-container">
          <Input
            submitLocation={submitLocation}
            setName={setName}
            setCountry={setCountry}
            setRegion={setRegion}
            name={name}
            country={country}
            region={region}
          />
        </div>
        <div className="error-container">
          <h1>{errorMessage}</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-container"
        style={{backgroundImage: `url(${weather.current.backgroundAndIcon.backgroundImage}`}}
      >
        <div className="upper-container">
          <Input
            submitLocation={submitLocation}
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
            preferredUnit={preferredUnit}
            airQuality={weather.pollution}
          />
        </div>
        <div className="lower-container">
          <HourlyForecastContainer
            weather={weather}
            hourly={weather.hourly}
            sunrise={weather.current.sunrise}
            sunset={weather.current.sunset}
            dt={weather.current.dt}
            preferredUnit={preferredUnit}

          />
          <DailyForecastContainer
            daily={weather.daily}
            preferredUnit={preferredUnit}
          />
        </div>
      </div>
    );
  }
};

export default Main;
