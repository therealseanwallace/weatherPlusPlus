const convertTimesFromUnix = (time, offset) => {
  // Takes unix time from Open Weather and returns a string with the remote
  // time (i.e. the place we're getting weather for) in human-readable format
  const timeOffset = time + offset;
  const timeConverted = timeOffset * 1000;
  const d = new Date(timeConverted);
  const dString = JSON.stringify(d);
  const regex = /([01]\d|2[0-3]):[0-5]\d/;
  const time24h = dString.match(regex)[0];
  return time24h;
};

export default convertTimesFromUnix;