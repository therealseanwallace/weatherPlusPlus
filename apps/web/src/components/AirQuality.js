import React from "react";
import getDayAndTime from "../helpers/getDayAndTime";

const AirQuality = (props) => {
  console.log('air quality props are: ', props);
  return (
    <div className="air-quality">
      <h2>Air Quality</h2>
      <h3>Air Quality Index: {props.airQuality.main.aqi}</h3>
      <h3>Carbon Monoxide (CO): {props.airQuality.components.co}</h3>
      <h3>Ammonia (NH3): {props.airQuality.components.nh3}</h3>
      <h3>Nitric Oxide (NO) {props.airQuality.components.no}</h3>
      <h3>Nitrogen Dioxide (NO2): {props.airQuality.components.no2}</h3>
      <h3>Ozone (O3): {props.airQuality.components.o3}</h3>
      <h3>Sulfur Dioxide (SO2): {props.airQuality.components.so2}</h3>
      <h3>Particulate Matter 2.5 (PM2.5): {props.airQuality.components.pm2_5}</h3>
      <h3>Particulate Matter 10 (PM10): {props.airQuality.components.pm10}</h3>
    </div>
  )
}

export default AirQuality;