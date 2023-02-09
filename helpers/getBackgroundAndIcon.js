import weatherConditions from "../constants/weatherConditions.json" assert { type: "json" };

console.log("weatherConditions is: ", weatherConditions);

const getBackgroundAndIcon = (id, isNight) => {
  const idNumber = Number(id);
  const background = weatherConditions.codes[idNumber];
  console.log('background is: ', background);
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

/*switch (id) {
    case 200:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 201:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 202:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 210:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 211:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 212:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 221:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 230:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 231:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 232:
      background = "http://localhost:3001/public/images/thunder.webp";
      break;
    case 300:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 301:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 302:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 310:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 311:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 312:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 313:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 314:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 321:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 500:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 501:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 502:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 503:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 504:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 511:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 520:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 521:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 522:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 531:
      background = "http://localhost:3001/public/images/rain.webp";
      break;
    case 600:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 601:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 602:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 611:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 612:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 613:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 615:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 616:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 620:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 621:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 622:
      background = "http://localhost:3001/public/images/snow.webp";
      break;
    case 701:
      background = "http://localhost:3001/public/images/fog.webp";
      break;
    case 711:
      background = "http://localhost:3001/public/images/smoke.webp";
      break;
    case 721:
      background = "http://localhost:3001/public/images/haze.webp";
      break;
    case 731:
      background = "http://localhost:3001/public/images/dustSand.webp";
      break;
    case 741:
      background = "http://localhost:3001/public/images/fog.webp";
      break;
    case 751:
      background = "http://localhost:3001/public/images/dustSand.webp";
      break;
    case 761:
      background = "http://localhost:3001/public/images/dustSand.webp";
      break;
    case 762:
      background = "http://localhost:3001/public/images/ash.webp";
      break;
    case 771:
      background = "http://localhost:3001/public/images/wind.webp";
      break;
    case 781:
      background = "http://localhost:3001/public/images/tornado.webp";
      break;
    case 800:
      background = "http://localhost:3001/public/images/clear.webp";
      break;
    case 801:
      background = "http://localhost:3001/public/images/clouds.webp";
      break;
    case 802:
      background = "http://localhost:3001/public/images/clouds.webp";
      break;
    case 803:
      background = "http://localhost:3001/public/images/clouds.webp";
      break;
    case 804:
      background = "http://localhost:3001/public/images/overcast.webp";
      break;
    default:
      background = "http://localhost:3001/public/images/clear.webp";
      break;
  }*/
