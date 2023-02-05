import pkg from "node-temperature-converter";
const { Kelvin } = pkg;

const convertTemps = (kelvin, unit) => {
  /*const Converter = import("node-temperature-converter");
  const converter = new Converter.Kelvin(kelvin);*/
  console.log('Kelvin is: ', Kelvin, 'typeof Kelvin is: ', typeof Kelvin);
  const converter = new Kelvin(kelvin);
  const metric = converter.toCelsius().toFixed(0) + "°C";
  const imperial = converter.toFahrenheit().toFixed(0) + "°F";
  return { metric, imperial };
}

export default convertTemps;