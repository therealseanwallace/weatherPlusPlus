import weatherConditions from "../constants/weatherConditions.json" assert { type: "json" };

const getBackgroundAndIcon = (id, isNight) => {
  const idNumber = Number(id);
  const background = weatherConditions.codes[idNumber];
  const backgroundImage = weatherConditions.links.backgrounds[background.background];
  let icon;
  if (isNight) {
    icon = weatherConditions.codes[idNumber].iconNight;
  } else {
    icon = weatherConditions.codes[idNumber].iconDay;
  }
  const iconImage = weatherConditions.links.icons[icon];

  return { backgroundImage, iconImage };
};

export default getBackgroundAndIcon;
