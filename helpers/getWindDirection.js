const convertWind = (deg) => {
  // Takes wind direction as degrees and returns a human-readable string
  let direction;
  switch (true) {
    case deg >= 337.5 || deg < 22.5:
      direction = "North";
      break;
    case deg < 67.5:
      direction = "North-East";
      break;
    case deg < 112.5:
      direction = "East";
      break;
    case deg < 157.5:
      direction = "South-East";
      break;
    case deg < 202.5:
      direction = "South";
      break;
    case deg < 247.5:
      direction = "South-West";
      break;
    case deg < 292.5:
      direction = "West";
      break;
    default:
      direction = "North-West";
  }
  return direction;
};

export default convertWind;