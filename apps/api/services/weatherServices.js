/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable quotes */
import dotenv from "dotenv";
import { WeatherModel } from "../resources/schemasModels.js";

dotenv.config();

const openWeatherKey = process.env.KEY_OPENWEATHER;
console.log("process.env is: ", process.env);

const getLocation = async (name, country, state) => {
  console.log(
    "getLocation function called. name, country, state are: ",
    name,
    country,
    state,
  );
  let result;
  try {
    if (state && state !== "none") {
      console.log("state is present");
      result = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name},${state},${country}&limit=5&appid=${openWeatherKey}`,
        {
          mode: "cors",
        },
      );

      return result;
    }
    console.log("state is not present");
    result = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name},${country}&limit=5&appid=${openWeatherKey}`,
      {
        mode: "cors",
      },
    );

    return result;
  } catch (error) {
    console.log('error getting location: ', error.message);
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
      checkEntry,
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
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${openWeatherKey}`,
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
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${openWeatherKey}`,
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

const createNewWeatherEntry = async (params) => {
  console.log("createNewWeatherEntry function called, params is: ", params);
  const {
    name, country, state, lat, long, exists
  } = params;
  console.log("lat, long are: ", lat, long);
  const newEntry = new WeatherModel({});
  const weather = await getWeather(lat, long);
  // console.log('weather is: ', await weather);
  const pollution = await getPollutionData(lat, long);
  console.log("pollution is: ", pollution);
  console.log("pollution.main is: ", pollution.main);
  console.log("pollution.list is: ", pollution.list);

  // populates the new entry with data from weather and pollution APIs
  newEntry.cityName = name;
  newEntry.latitude = lat;
  newEntry.longitude = long;
  newEntry.timezone = weather.timezone;
  newEntry.timezoneOffset = weather.timezone_offset;
  newEntry.timestamp = Date.now();
  newEntry.current = weather.current;
  newEntry.hourly = weather.hourly;
  newEntry.daily = weather.daily;
  newEntry.alerts = weather.alerts;
  newEntry.pollution = pollution;
  console.log("New entry assembled! newEntry is: ", newEntry);
  const savedEntry = await newEntry.save();
  return savedEntry;
};

const processPOST = async (name, country, state) => {
  console.log(
    "processPOST function called. name, country, state are: ",
    name,
    country,
    state,
  );
  console.log("openWeatherKey is: ", openWeatherKey);
  const location = await getLocation(name, country, state);
  console.log("location is: ", location);
  const locationJSON = await location.json();
  console.log('locationJSON is: ', locationJSON);
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
      const updatedEntry = await createNewWeatherEntry(params);
      const updatedEntryArray = [updatedEntry];
      return updatedEntryArray;
    }
    console.log("Entry is younger than 15 minutes. Returning entry.");
    return checkEntry;
  }
  console.log("DB entry does not exist. Creating new entry.");
  const savedEntryArray = [  await createNewWeatherEntry(params) ];
  console.log("savedEntryArray is: ", savedEntryArray);
  return savedEntryArray;

  /* const locationReader = location.body.getReader();
  console.log('locationReader is: ', locationReader);
  console.log('location is: ', location);
  console.log('locationReader.read() is: ', locationReader.read());
  console.log('location.body is', location.body);
  console.log('typeof location.body is', typeof location.body);
  const locationJSON = await location.json();
  console.log('locationJSON is: ', locationJSON); */
};

export default processPOST;
