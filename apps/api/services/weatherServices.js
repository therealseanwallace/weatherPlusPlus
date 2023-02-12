import dotenv from "dotenv";
import { WeatherModel } from "../resources/schemasModels.js";
import convertDates from "../helpers/convertDates.js";
import convertTemps from "../helpers/convertTemps.js";
import convertDistances from "../helpers/convertDistances.js";
import getBackgroundAndIcon from "../helpers/getBackgroundAndIcon.js";
import getWindDirection from "../helpers/getWindDirection.js";
import isNight from "../helpers/isNight.js";

dotenv.config();

const openWeatherKey = process.env.KEY_OPENWEATHER;
console.log("process.env is: ", process.env);

const userPreferredUnits = "metric";

const getLocation = async (name, country, state) => {
  let result;
  try {
    if (state && state !== "none") {
      result = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name},${state},${country}&limit=5&appid=${openWeatherKey}`,
        {
          mode: "cors",
        }
      );
      console.log('got location! result is: ', result);
      return result;
    }
    result = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name},${country}&limit=5&appid=${openWeatherKey}`,
      {
        mode: "cors",
      }
    );
    console.log('got location! result is: ', result);
    return result;
  } catch (error) {
    return error.message;
  }
};

const checkIfDBEntryExistsAndReturnEntry = async (lat, long) => {
  try {
    const checkEntry = await WeatherModel.find({
      latitude: lat.toFixed(4),
      longitude: long.toFixed(4),
    });
    if (checkEntry.length > 0) {
      console.log("checkEntry is: ", checkEntry);
      return checkEntry;
    }
    return false;
  } catch (error) {
    console.error("Error checking if DB entry exists: ", error.message);
  }
};

const getWeather = async (lat, long) => {
  let weather;
  try {
    weather = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${openWeatherKey}`
    );
    const weatherJSON = await weather.json();
    return weatherJSON;
  } catch (error) {
    console.error("Error getting weather: ", error.message);
  }
};

const getPollutionData = async (lat, long) => {
  let pollution;
  try {
    pollution = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${openWeatherKey}`
    );
    const pollutionJSON = await pollution.json();
    return pollutionJSON;
  } catch (error) {
    console.error("Error getting pollution data: ", error.message);
  }
};

const composeEntry = async (...args) => {
  const [lat, long, name] = args;
  const weather = await getWeather(lat, long);
  const pollution = await getPollutionData(lat, long);
  const newEntry = {};
  const backgroundAndIcon = getBackgroundAndIcon(
    weather.current.weather[0].id,
    isNight()
  );
  newEntry.cityName = name;
  newEntry.latitude = lat;
  newEntry.longitude = long;
  newEntry.timezone = weather.timezone;
  newEntry.timezoneOffset = weather.timezone_offset;
  newEntry.timestamp = Date.now();
  const windDir = getWindDirection(weather.current.wind_deg);
  newEntry.current = {
    clouds: weather.current.clouds,
    dt: weather.current.dt,
    feelsLike: weather.current.feels_like,
    humidity: weather.current.humidity,
    pressure: weather.current.pressure,
    sunrise: weather.current.sunrise,
    sunset: weather.current.sunset,
    temp: weather.current.temp,
    min: weather.daily[0].temp.min,
    max: weather.daily[0].temp.max,
    uvi: weather.current.uvi,
    visibility: weather.current.visibility,
    weather: {
      description: weather.current.weather[0].description,
      id: weather.current.weather[0].id,
    },
    wind: {
      dir: windDir,
      speed: weather.current.wind_speed,
    },
    backgroundAndIcon: backgroundAndIcon,
  };

  newEntry.pollution = {
    aqi: pollution.list[0].main.aqi,
    co: pollution.list[0].components.co,
    nh3: pollution.list[0].components.nh3,
    no: pollution.list[0].components.no,
    no2: pollution.list[0].components.no2,
    o3: pollution.list[0].components.o3,
    so2: pollution.list[0].components.so2,
    pm2_5: pollution.list[0].components.pm2_5,
    pm10: pollution.list[0].components.pm10,
  };
  newEntry.daily = weather.daily.map((day) => {
    const backgroundAndIcon = getBackgroundAndIcon(
      day.weather[0].id,
      isNight(day.sunrise, day.sunset)
    );
    return {
      dt: day.dt,
      sunrise: day.sunrise,
      sunset: day.sunset,
      max: day.temp.max,
      min: day.temp.min,
      humidity: day.humidity,
      pressure: day.pressure,
      uvi: day.uvi,
      description: day.weather[0].description,
      id: day.weather[0].id,
      icon: backgroundAndIcon.iconImage,
    };
  });
  newEntry.hourly = weather.hourly.map((hour) => {
    const backgroundAndIcon = getBackgroundAndIcon(
      hour.weather[0].id,
      isNight(hour.sunrise, hour.sunset)
    );
    return {
      dt: hour.dt,
      temp: hour.temp,
      sunrise: newEntry.current.sunrise,
      sunset: newEntry.current.sunset,
      id: hour.weather[0].id,
      icon: backgroundAndIcon.iconImage,
    };
  });

  if (weather.alerts) {
    newEntry.alerts = weather.alerts;
  }
  const newEntryModel = new WeatherModel(newEntry);
  const savedEntry = await newEntryModel.save();
  return savedEntry;
};

// converts from temperatures in Kelvin to Celsius or Fahrenheit
const doConversionsOnEntry = async (entry, units) => {
  const newEntry = entry[0];
  newEntry.current.dt = convertDates(
    entry[0].current.dt,
    entry[0].timezoneOffset,
    units
  );
  newEntry.current.feelsLike = convertTemps(entry[0].current.feelsLike, units);
  newEntry.current.sunrise = convertDates(
    entry[0].current.sunrise,
    newEntry.timezoneOffset,
    units
  );
  newEntry.current.sunset = convertDates(
    entry[0].current.sunset,
    newEntry.timezoneOffset,
    units
  );
  newEntry.current.temp = convertTemps(entry[0].current.temp, units);
  newEntry.current.visibility = convertDistances(
    entry[0].current.visibility,
    units
  );
  newEntry.current.wind.speed = convertDistances(
    entry[0].current.wind.speed,
    units,
    true
  );
  newEntry.current.min = convertTemps(entry[0].current.min, units);
  newEntry.current.max = convertTemps(entry[0].current.max, units);
  newEntry.daily = newEntry.daily.map((day) => {
    day.dt = convertDates(day.dt, newEntry.timezoneOffset, units);
    day.max = convertTemps(day.max, units);
    day.min = convertTemps(day.min, units);
    day.sunrise = convertDates(day.sunrise, newEntry.timezoneOffset, units);
    day.sunset = convertDates(day.sunset, newEntry.timezoneOffset, units);
    return day;
  });
  newEntry.hourly = newEntry.hourly.map((hour) => {
    hour.dt = convertDates(hour.dt, newEntry.timezoneOffset, units);
    hour.sunrise = convertDates(hour.sunrise, newEntry.timezoneOffset, units);
    hour.sunset = convertDates(hour.sunset, newEntry.timezoneOffset, units);
    hour.temp = convertTemps(hour.temp, units);
    return hour;
  });

  return newEntry;
};

const composeResponse = async (args) => {
  const [name, country, state] = args;
  let location;
  if (country !== "United States") {
    location = await getLocation(name, country);
  } else {
    location = await getLocation(name, country, state);
  }

  const locationJSON = await location.json();
  console.log('got location. locationJSON: ', locationJSON);
  if (locationJSON.length === 0) {
    return 404;
  }
  const lat = locationJSON[0].lat.toFixed(4);
  const long = locationJSON[0].lon.toFixed(4);
  const correctedName = locationJSON[0].name;
  const checkEntry = await checkIfDBEntryExistsAndReturnEntry(lat, long);
  let newOrUpdatedEntry;

  if (checkEntry) {
    if (checkEntry[0].timestamp < Date.now() - 900000) {
      newOrUpdatedEntry = [await composeEntry(lat, long, correctedName)];
    } else {
      return checkEntry;
    }
  }
  if (!newOrUpdatedEntry) {
    newOrUpdatedEntry = [await composeEntry(lat, long, correctedName)];
  }
  const entryConverted = await doConversionsOnEntry(
    newOrUpdatedEntry,
    userPreferredUnits
  );
  return entryConverted;
};

const processGET = async (...args) => {
  const response = await composeResponse(args);
  return response;
};

export default processGET;
