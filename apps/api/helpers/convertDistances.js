const convertDistances = (distance, isSpeed) => {
  let metric;
  let imperial;

  if (isSpeed) {
    metric = `${Math.ceil(distance)} km/h`;
    imperial = `${Math.ceil(distance * 0.621371192)} mph`;
  } else {
    metric = `${Math.ceil(distance)} meters`;
    imperial = `${Math.ceil(distance) * 1.09361} yards`;
  }
  return { metric, imperial };
}

export default convertDistances;
