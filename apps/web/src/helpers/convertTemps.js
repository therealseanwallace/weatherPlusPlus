const convertTemps = (temps, unit) => {
  const Converter = require("node-temperature-converter");
  const converter = new Converter.Kelvin(temps);
  let convertedTemps;
  if (unit === "metric") {
    convertedTemps = converter.toCelsius().toFixed(0) + "°C";
  } else if (unit === "imperial") {
    convertedTemps = converter.toFahrenheit().toFixed(0) + "°F";
  } else {
    convertedTemps = converter.toKelvin().toFixed(0) + "°K";
  }
}

export default convertTemps;