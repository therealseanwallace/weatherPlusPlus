const isNight = (...args) => {
  const [sunrise, sunset, time] = args;
  const isNight = time < sunrise || time > sunset;
  return isNight;
}

export default isNight;