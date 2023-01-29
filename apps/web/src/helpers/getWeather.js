const getWeather = async (location) => {
  try {
    console.log("getWeather function called");
    const { name, country, state } = location;
    console.log('name, country, state are: ', name, country, state);
    const weather = await fetch(
      `localhost:3001/api/weather/name/${name}/country/${country}/state/${state}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    console.log("weather is: ", weather);
  } catch (error) {
    console.error("Error getting weather: ", error.message);
  }
};

export default getWeather;