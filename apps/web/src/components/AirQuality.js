import React from "react";

const AirQuality = (props) => {
  console.log('air quality props are: ', props);
  return (
    <div className="air-quality">
      <h2>Air Quality</h2>
      <h3>Air Quality Index: {props.airQuality.aqi}</h3>
      <h3>Carbon Monoxide (CO): {props.airQuality.co}</h3>
      <h3>Ammonia (NH3): {props.airQuality.nh3}</h3>
      <h3>Nitric Oxide (NO) {props.airQuality.no}</h3>
      <h3>Nitrogen Dioxide (NO2): {props.airQuality.no2}</h3>
      <h3>Ozone (O3): {props.airQuality.o3}</h3>
      <h3>Sulfur Dioxide (SO2): {props.airQuality.so2}</h3>
      <h3>Particulate Matter 2.5 (PM2.5): {props.airQuality.pm2_5}</h3>
      <h3>Particulate Matter 10 (PM10): {props.airQuality.pm10}</h3>
    </div>
  )
}

export default AirQuality;
