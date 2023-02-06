/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable quotes */
import dotenv from "dotenv";
import { WeatherModel } from "../resources/schemasModels.js";
import convertDates from "../helpers/convertDates.js";
import convertTemps from "../helpers/convertTemps.js";
import convertDistances from "../helpers/convertDistances.js";
import getBackground from "../helpers/getBackground.js";
import getWindDirection from "../helpers/getWindDirection.js";

dotenv.config();

const openWeatherKey = process.env.KEY_OPENWEATHER;
console.log("process.env is: ", process.env);

const userPreferredUnits = "metric";

const getLocation = async (name, country, state) => {
  console.log(
    "getLocation function called. name, country, state are: ",
    name,
    country,
    state
  );
  let result;
  try {
    if (state && state !== "none") {
      console.log("state is present");
      result = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name},${state},${country}&limit=5&appid=${openWeatherKey}`,
        {
          mode: "cors",
        }
      );

      return result;
    }
    console.log("state is not present");
    result = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name},${country}&limit=5&appid=${openWeatherKey}`,
      {
        mode: "cors",
      }
    );

    return result;
  } catch (error) {
    console.log("error getting location: ", error.message);
    return error.message;
  }
};

const checkIfDBEntryExistsAndReturnEntry = async (lat, long) => {
  try {
    const checkEntry = await WeatherModel.find({
      latitude: lat.toFixed(4),
      longitude: long.toFixed(4),
    });
    console.log(
      "checkIfDBEntryExistsAndReturnEntry! checkEntry is: ",
      checkEntry
    );
    if (checkEntry.length > 0) {
      console.log("checkEntry is: ", checkEntry);
      return checkEntry;
    }
    return false;
  } catch (error) {
    console.log("Error checking if DB entry exists: ", error.message);
  } finally {
    console.log("entry checked");
  }
};

const getWeather = async (lat, long) => {
  console.log("getWeather! lat is ", lat, "long is ", long);
  let weather;
  try {
    weather = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${openWeatherKey}`
    );
    const weatherJSON = await weather.json();
    console.log("weatherJSON is: ", weatherJSON);
    return weatherJSON;
  } catch (error) {
    console.log("Error getting weather: ", error.message);
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
    console.log("Error getting pollution data: ", error.message);
  }
};

const processImage = async (image) => {
  const blob = await image.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};

const composeEntry = async (...args) => {
  const [lat, long, name] = args;
  const weather = await getWeather(lat, long);
  const pollution = await getPollutionData(lat, long);
  console.log("weather is: ", weather, "pollution is: ", pollution);
  const newEntry = {};
  const background = getBackground(weather.current.weather[0].id);
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
    background: background,
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
    };
  });
  newEntry.hourly = weather.hourly.map((hour) => {
    console.log('assembling hourly forecast. hour is: ', hour);
    return {
      dt: hour.dt,
      temp: hour.temp,
      sunrise: newEntry.current.sunrise,
      sunset: newEntry.current.sunset,
      id: hour.weather[0].id,
    };
  });
  
  if (weather.alerts) {
    newEntry.alerts = weather.alerts;
  }
  console.log('newEntry assembled. newEntry is: ', newEntry, 'newEntry.hourly is:', newEntry.hourly);
  const newEntryModel = new WeatherModel(newEntry);
  const savedEntry = await newEntryModel.save();
  return savedEntry;
};

// converts from temperatures in Kelvin to Celsius or Fahrenheit
const doConversionsOnEntry = async (entry, units) => {
  const newEntry = entry[0];
  console.log("doConversionsOnEntry! newEntry is: ", newEntry, typeof newEntry);

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
  console.log("composeResponse function called, args are: ", args);
  const [name, country, state] = args;
  const location = await getLocation(name, country, state);
  const locationJSON = await location.json();
  console.log("locationJSON is: ", locationJSON);
  const lat = locationJSON[0].lat.toFixed(4);
  const long = locationJSON[0].lon.toFixed(4);
  const correctedName = locationJSON[0].name;
  const checkEntry = await checkIfDBEntryExistsAndReturnEntry(lat, long);
  let newOrUpdatedEntry;

  if (checkEntry) {
    console.log("DB entry exists. Entry is: ", checkEntry);
    console.log("checkEntry[0].timestamp is: ", checkEntry[0].timestamp);
    console.log("Date.now() - 900000 is: ", Date.now() - 900000);
    if (checkEntry[0].timestamp < Date.now() - 900000) {
      console.log("Entry is older than 15 minutes. Updating entry.");
      newOrUpdatedEntry = [await composeEntry(lat, long, correctedName)];
      console.log("updatedEntryArray is: ", updatedEntryArray);
    } else {
      return checkEntry;
    }
  }
  if (!newOrUpdatedEntry) {
    console.log("DB entry does not exist. Creating new entry.");
    newOrUpdatedEntry = [await composeEntry(lat, long, correctedName)];
  }
  const entryConverted = await doConversionsOnEntry(
    newOrUpdatedEntry,
    userPreferredUnits
  );
  console.log("entryConverted is: ", entryConverted);
  return entryConverted;
};

const processGET = async (...args) => {
  console.log(
    "processGET function called, args are: ",
    args,
    "typeof args is: ",
    typeof args
  );
  const response = await composeResponse(args);
  return response;

  /*
  const params = {

    
    name,
    country,
    state,
    lat: locationJSON[0].lat.toFixed(4),
    long: locationJSON[0].lon.toFixed(4),
  };
  console.log("locationJSON[0] is: ", locationJSON[0]);
  console.log("locationJSON[0].lat is: ", locationJSON[0].lat);
  console.log("locationJSON[0].lon   is: ", locationJSON[0].lon);
  const checkEntry = await checkIfDBEntryExistsAndReturnEntry(
    locationJSON[0].lat,
    locationJSON[0].lon,
  );
  console.log(
    "checkEntry is: ",
    checkEntry,
    "typeof checkEntry is: ",
    typeof checkEntry,
  );
  if (checkEntry) {
    console.log("DB entry exists. Entry is: ", checkEntry);
    console.log("checkEntry[0].timestamp is: ", checkEntry[0].timestamp);
    console.log("Date.now() - 900000 is: ", Date.now() - 900000);
    if (checkEntry[0].timestamp < Date.now() - 900000) {
      console.log("Entry is older than 15 minutes. Updating entry.");
      params.exists = true;
      const updatedEntry = await composeResponse(params);
      const updatedEntryArray = [updatedEntry];
      return updatedEntryArray;
    }
    console.log("Entry is younger than 15 minutes. Returning entry.");
    return checkEntry;
  }
  console.log("DB entry does not exist. Creating new entry.");
  const savedEntryArray = [  await createNewWeatherEntry(params) ];
  console.log("savedEntryArray is: ", savedEntryArray);
  return savedEntryArray;*/
};

export default processGET;
