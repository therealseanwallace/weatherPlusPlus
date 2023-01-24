import { apiKey } from "../config.js";
import { WeatherModel } from "../resources/schemasModels.js";
//import { promises as fs } from "fs";

const getLocation = async (name, country, state) => {
  console.log("api key: ", apiKey);
  let result;
  try {
    if (state && state !== "null") {
      console.log("state is present");
      result = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name},${state},${country}&limit=5&appid=${apiKey}`,
        {
          mode: "cors",
        }
      );

      return result;
    } else {
      console.log("state is not present");
      result = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name},${state}&limit=5&appid=${apiKey}`,
        {
          mode: "cors",
        }
      );

      return result;
    }
  } catch (error) {
    return (error = "Error getting location: "), error.message;
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
    );
    const weatherJSON = await weather.json();
    return weatherJSON;
  } catch (error) {
    console.log("Error getting weather: ", error.message);
  }
};

const getPollutionData = async (lat, long) => {
  let pollution;
  try {
    pollution = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${apiKey}`
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
const createNewWeatherEntry = async (lat, long, mapTimestamp) => {
  const newEntry = new WeatherModel({});
  const weather = await getWeather(lat, long);
  //console.log('weather is: ', await weather);
  const pollution = await getPollutionData(lat, long);
  console.log("pollution is: ", pollution);
  console.log("pollution.main is: ", pollution.main);
  console.log("pollution.list is: ", pollution.list);

  // populates the new entry with data from weather and pollution APIs
  newEntry.cityId = weather.id;
  newEntry.latitude = weather.coord.lat;
  newEntry.longitude = weather.coord.lon;
  newEntry.timestamp = Date.now();
  newEntry.cityName = weather.name;
  newEntry.country = weather.sys.country;
  newEntry.state = weather.sys.state;
  newEntry.weatherId = weather.weather[0].id;
  newEntry.description = weather.weather[0].description;
  newEntry.temp = weather.main.temp;
  newEntry.temp_min = weather.main.temp_min;
  newEntry.temp_max = weather.main.temp_max;
  newEntry.pressure = weather.main.pressure;
  newEntry.humidity = weather.main.humidity;
  newEntry.wind_speed = weather.wind.speed;
  newEntry.wind_deg = weather.wind.deg;
  newEntry.wind_gust = weather.wind.gust;
  newEntry.clouds = weather.clouds.all;
  newEntry.sunrise = weather.sys.sunrise;
  newEntry.sunset = weather.sys.sunset;
  newEntry.timezone = weather.timezone;
  newEntry.aqi = pollution.list[0].main.aqi;
  newEntry.co = pollution.list[0].components.co;
  newEntry.no = pollution.list[0].components.no;
  newEntry.no2 = pollution.list[0].components.no2;
  newEntry.ozone = pollution.list[0].components.o3;
  newEntry.so2 = pollution.list[0].components.so2;
  newEntry.pm25 = pollution.list[0].components.pm2_5;
  newEntry.pm10 = pollution.list[0].components.pm10;
  newEntry.nh3 = pollution.list[0].components.nh3;

  console.log("New entry assembled! newEntry is: ", newEntry);
  const savedEntry = await newEntry.save();
  return savedEntry;
};

export const processPOST = async (name, country, state) => {
  console.log("processPOST function called");
  const location = await getLocation(name, country, state);
  console.log("location is: ", location);
  const locationJSON = await location.json();
  console.log("locationJSON[0] is: ", locationJSON[0]);
  console.log("locationJSON[0].lat is: ", locationJSON[0].lat);
  console.log("locationJSON[0].lon   is: ", locationJSON[0].lon);
  const checkEntry = await checkIfDBEntryExistsAndReturnEntry(
    locationJSON[0].lat,
    locationJSON[0].lon
  );
  console.log(
    "checkEntry is: ",
    checkEntry,
    "typeof checkEntry is: ",
    typeof checkEntry
  );
  if (checkEntry) {
    console.log("DB entry exists. Entry is: ", checkEntry);
    console.log("checkEntry[0].timestamp is: ", checkEntry[0].timestamp);
    console.log("Date.now() - 900000 is: ", Date.now() - 900000);
    if (checkEntry[0].timestamp < Date.now() - 900000) {
      console.log("Entry is older than 15 minutes. Updating entry.");
      const updatedEntry = await createNewWeatherEntry(
        locationJSON[0].lat,
        locationJSON[0].lon,
      );
      return updatedEntry;
    } else {
      console.log("Entry is younger than 15 minutes. Returning entry.");
      return checkEntry;
    }
  } else {
    console.log("DB entry does not exist. Creating new entry.");
    const savedEntry = await createNewWeatherEntry(
      locationJSON[0].lat,
      locationJSON[0].lon
    );
    console.log("savedEntry is: ", savedEntry);
    return savedEntry;
  }

  /*const locationReader = location.body.getReader();
  console.log('locationReader is: ', locationReader);
  console.log('location is: ', location);
  console.log('locationReader.read() is: ', locationReader.read());
  console.log('location.body is', location.body);
  console.log('typeof location.body is', typeof location.body);
  const locationJSON = await location.json();
  console.log('locationJSON is: ', locationJSON);*/
};
