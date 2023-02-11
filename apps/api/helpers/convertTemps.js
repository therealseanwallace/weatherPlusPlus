import pkg from "node-temperature-converter";
const { Kelvin } = pkg;

const convertTemps = (kelvin, unit) => {
  const converter = new Kelvin(kelvin);
  const metric = converter.toCelsius().toFixed(0) + "°C";
  const imperial = converter.toFahrenheit().toFixed(0) + "°F";
  return { metric, imperial };
}

export default convertTemps;