const convertTemps = (kelvin, unit) => {
  const Converter = require("node-temperature-converter");
  const converter = new Converter.Kelvin(kelvin);
  let convertedTemps;
  if (unit === "metric") {
    convertedTemps = converter.toCelsius().toFixed(0) + "°C";
  } else {
    convertedTemps = converter.toFahrenheit().toFixed(0) + "°F";
  }
  return convertedTemps;
}

export default convertTemps;