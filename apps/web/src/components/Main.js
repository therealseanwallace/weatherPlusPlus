import React, { useState, useEffect } from "react";
import Input from "./Input";
import getWeather from "../helpers/getWeather";

const Main = () => {
  let [name, setName] = useState("");
  let [country, setCountry] = useState("");
  let [region, setRegion] = useState("");

  const submitLocation = async (e) => {
    e.preventDefault();
    console.log("submitLocation function called. e is: ", e);
    const weather = await getWeather({name, country, region});
    console.log('main - weather is: ', weather);
  }
  
  return (
    <div className="main-container">
      <div className="upper-container">
        <Input submitLocation={submitLocation} 
          setName={setName}
          setCountry={setCountry}
          setRegion={setRegion}
          name={name}
          country={country}
          region={region}
        />
      </div>

      <div className="lower-container"></div>
    </div>
  );
};

export default Main;
