import angryClouds from "../assets/angry_clouds.svg";
import cloudy from "../assets/cloudy.svg";
import dayClear from "../assets/day_clear.svg";
import dayPartialCloud from "../assets/day_partial_cloud.svg";
import dayRainThunder from "../assets/day_rain_thunder.svg";
import dayRain from "../assets/day_rain.svg";
import daySleet from "../assets/day_sleet.svg";
import daySnowThunder from "../assets/day_snow_thunder.svg";
import daySnow from "../assets/day_snow.svg";
import fog from "../assets/fog.svg";
import mist from "../assets/mist.svg";
import nightClear from "../assets/night_half_moon_clear.svg";
import nightHalfMoonPartialCloud from "../assets/night_half_moon_partial_cloud.svg";
import nightHalfMoonRainThunder from "../assets/night_half_moon_rain_thunder.svg";
import nightHalfMoonRain from "../assets/night_half_moon_rain.svg";
import nightHalfMoonSleet from "../assets/night_half_moon_sleet.svg";
import nightHalfMoonSnowThunder from "../assets/night_half_moon_snow_thunder.svg";
import nightHalfMoonSnow from "../assets/night_half_moon_snow.svg";
import overcast from "../assets/overcast.svg";
import rainThunder from "../assets/rain_thunder.svg";
import rain from "../assets/rain.svg";
import sleet from "../assets/sleet.svg";
import snowThunder from "../assets/snow_thunder.svg";
import snow from "../assets/snow.svg";
import thunder from "../assets/thunder.svg";
import tornado from "../assets/tornado.svg";
import wind from "../assets/wind.svg";

import isNight from "./isNight";

// arguments: weatherCode, sunrise, sunset, time

const weatherCodesandIconsNight = {
  200: nightHalfMoonRainThunder,
  201: nightHalfMoonRainThunder,
  202: nightHalfMoonRainThunder,
  210: nightHalfMoonRainThunder,
  211: nightHalfMoonRainThunder,
  212: nightHalfMoonRainThunder,
  221: nightHalfMoonRainThunder,
  230: nightHalfMoonRainThunder,
  231: nightHalfMoonRainThunder,
  232: nightHalfMoonRainThunder,
  300: nightHalfMoonRain,
  301: nightHalfMoonRain,
  302: nightHalfMoonRain,
  310: nightHalfMoonRain,
  311: nightHalfMoonRain,
  312: nightHalfMoonRain,
  313: nightHalfMoonRain,
  314: nightHalfMoonRain,
  321: nightHalfMoonRain,
  500: nightHalfMoonRain,
  501: nightHalfMoonRain,
  502: nightHalfMoonRain,
  503: nightHalfMoonRain,
  504: nightHalfMoonRain,
  520: nightHalfMoonSleet,
  521: nightHalfMoonSleet,
  522: nightHalfMoonSleet,
  531: nightHalfMoonSleet,
  600: nightHalfMoonSnow,
  601: nightHalfMoonSnow,
  602: nightHalfMoonSnow,
  611: nightHalfMoonSleet,
  612: nightHalfMoonSleet,
  613: nightHalfMoonSleet,
  615: nightHalfMoonSleet,
  616: nightHalfMoonSleet,
  620: nightHalfMoonSnow,
  621: nightHalfMoonSnow,
  622: nightHalfMoonSnow,
  701: mist,
  711: angryClouds,
  721: mist,
  731: angryClouds,
  741: fog,
  751: angryClouds,
  761: angryClouds,
  762: angryClouds,
  771: wind,
  781: tornado,
  800: nightClear,
  801: nightHalfMoonPartialCloud,
  802: nightHalfMoonPartialCloud,
  803: nightHalfMoonPartialCloud,
  804: overcast,
};

const weatherCodesandIconsDay = {
  200: dayRainThunder,
  201: dayRainThunder,
  202: dayRainThunder,
  210: dayRainThunder,
  211: dayRainThunder,
  212: dayRainThunder,
  221: dayRainThunder,
  230: dayRainThunder,
  231: dayRainThunder,
  232: dayRainThunder,
  300: dayRain,
  301: dayRain,
  302: dayRain,
  310: dayRain,
  311: dayRain,
  312: dayRain,
  313: dayRain,
  314: dayRain,
  321: dayRain,
  500: dayRain,
  501: dayRain,
  502: dayRain,
  503: dayRain,
  504: dayRain,
  520: daySleet,
  521: daySleet,
  522: daySleet,
  531: daySleet,
  600: daySnow,
  601: daySnow,
  602: daySnow,
  611: daySleet,
  612: daySleet,
  613: daySleet,
  615: daySleet,
  616: daySleet,
  620: daySnow,
  621: daySnow,
  622: daySnow,
  701: mist,
  711: angryClouds,
  721: mist,
  731: angryClouds,
  741: fog,
  751: angryClouds,
  761: angryClouds,
  762: angryClouds,
  771: wind,
  781: tornado,
  800: dayClear,
  801: dayPartialCloud,
  802: dayPartialCloud,
  803: dayPartialCloud,
  804: overcast,
};

const returnWeatherIcon = (...args) => {
  const [weatherCode, sunrise, sunset, time] = args[0];

  if (isNight(sunrise, sunset, time)) {
    const icon = weatherCodesandIconsNight[weatherCode];
    //return weatherCodesandIconsNight.weatherCode;
    return icon;
  } else {
    const icon = weatherCodesandIconsDay[weatherCode];
    return icon
    //return weatherCodesandIconsDay.weatherCode;
  }
};

export default returnWeatherIcon;
