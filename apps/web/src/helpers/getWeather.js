const getWeather = async (name, country, state) => {
  try {
    console.log("getWeather function called");
    console.log('name, country, state are: ', name, country, state, 'typeof name, country, state are: ', typeof name, typeof country, typeof state);
    let weather;
    let stateToSend = state;
    if (stateToSend === "") {
      console.log('state is an empty string')
      stateToSend = "none";
    }
    weather = await fetch(
      `http://localhost:3001/api/weather/name/${name}/country/${country}/state/${stateToSend}`, {
        method: "GET",
        mode: "cors",
      });
      const weatherData = await weather.json();
      console.log('weatherData is: ', weatherData);
      return weatherData;
  } catch (error) {
    console.error("Error getting weather: ", error.message);
  }
};

export default getWeather;