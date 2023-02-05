const convert24to12 = (time24) => {
  const timeSplit = time24.split(":");
  let amPM;
  if (timeSplit[0] > 12) {
    amPM = "PM";
    if (timeSplit[0] >= 13)
    timeSplit[0] = timeSplit[0] - 12;
  } else {
    amPM = "AM";
  }
  return `${timeSplit[0]}:${timeSplit[1]} ${amPM}`
}

const convertDates = (dt, timezoneOffset, units) => {
  let dateHuman;
  let day;
  let time24;
  let time12;

  if (units === "metric") {
    dateHuman = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "CET",
    }).format((dt + timezoneOffset) * 1000);
    day = dateHuman.split(",")[0];
    time24 = dateHuman.match(/(\d{1,2}:\d{2})/g)[0];
    time12 = convert24to12(time24); 
  }

  return { day, time24, time12, dt };
};

export default convertDates;
