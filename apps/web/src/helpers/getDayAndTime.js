const getDayAndTime = (dt, timezoneOffset) => {
  const dateHuman = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "CET",
  }).format((dt + timezoneOffset) * 1000);
  const day = dateHuman.split(",")[0];

  // gets the time from the dateHuman string using regex
  const time = dateHuman.match(/(\d{1,2}:\d{2})/g)[0];

  return { day, time };
}

export default getDayAndTime;