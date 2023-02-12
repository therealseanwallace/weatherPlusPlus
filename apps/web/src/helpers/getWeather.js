const getWeather = async (name, country, state) => {
  try {
    console.log("getWeather function called");
    console.log(
      "name, country, state are: ",
      name,
      country,
      state,
      "typeof name, country, state are: ",
      typeof name,
      typeof country,
      typeof state
    );
    let weather;
    let stateToSend = state;
    if (stateToSend === "") {
      console.log("state is an empty string");
      stateToSend = "none";
    }
    weather = await fetch(
      `https://guarded-reaches-85062.herokuapp.com:3001/api/weather/name/${name}/country/${country}/state/${stateToSend}`,      
      {
        method: "GET",
        mode: "no-cors",
      }
    );
    if (weather.status === 429) {
      console.log("Error getting weather: 429");
      return 429;
    } else if (weather.status === 404) {
      console.log("Error getting weather: 404");
      return 404;
    } else {
      const weatherData = await weather.json();
      console.log("weatherData is: ", weatherData);
      return weatherData;
    }
    
  } catch (error) {
    console.error("Error getting weather: ", error.message);
  }
};

export default getWeather;
