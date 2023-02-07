import React from "react";

const AirQuality = (props) => {
  console.log('air quality props are: ', props);
  return (
    <div className="air-quality">
      <h2>Air Quality</h2>
      <h3>AQI: {props.airQuality.aqi}</h3>
      <h3>CO: {props.airQuality.co}</h3>
      <h3>NH3: {props.airQuality.nh3}</h3>
      <h3>NO {props.airQuality.no}</h3>
      <h3>NO2: {props.airQuality.no2}</h3>
      <h3>O3: {props.airQuality.o3}</h3>
      <h3>SO2: {props.airQuality.so2}</h3>
      <h3>PM2.5: {props.airQuality.pm2_5}</h3>
      <h3>PPM10: {props.airQuality.pm10}</h3>
    </div>
  )
}

export default AirQuality;
