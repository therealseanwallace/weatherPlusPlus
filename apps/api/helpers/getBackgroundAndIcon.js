import weatherConditions from "../constants/weatherConditions.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

const getBackgroundAndIcon = (id, isNight) => {
  const appURL = process.env.APP_HEROKU_URL;
  const idNumber = Number(id);
  const background = weatherConditions.codes[idNumber];
  const backgroundImage = appURL + weatherConditions.links.backgrounds[background.background];
  let icon;
  if (isNight) {
    icon = weatherConditions.codes[idNumber].iconNight;
  } else {
    icon = weatherConditions.codes[idNumber].iconDay;
  }
  const iconImage = appURL + weatherConditions.links.icons[icon];

  return { backgroundImage, iconImage };
};

export default getBackgroundAndIcon;
