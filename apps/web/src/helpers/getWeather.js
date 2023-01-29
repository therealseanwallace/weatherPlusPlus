const getWeather = async (name, country, state) => {
  try {
    console.log("getWeather function called");
    console.log('name, country, state are: ', name, country, state, 'typeof name, country, state are: ', typeof name, typeof country, typeof state);
    let weather;
    if (country === "" && state === "") {
      console.log('country and state are empty strings')
      weather = await fetch(
        `http://localhost:3001/api/weather/name/${name}/country/null/state/null`, {
          method: "GET",
          mode: "cors",
        });
    } else if (state === "") {
      console.log('state is an empty string')
      weather = await fetch(
        `http://localhost:3001/api/weather/name/${name}/country/${country}/state/null`, {
          method: "GET",
          mode: "cors",
        });
    }
    weather = await fetch(
      `http://localhost:3001/api/weather/name/${name}/country/${country}/state/${state}`, {
        method: "GET",
        mode: "cors",
      });
    console.log("weather is: ", weather);
  } catch (error) {
    console.error("Error getting weather: ", error.message);
  }
};

export default getWeather;