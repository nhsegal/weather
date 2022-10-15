import { currentData } from ".";

const capitalize = function (str) {
  let phrase = "";
  for (let i = 0; i < str.length; i++) {
    if (i === 0 || str[i - 1] === " ") {
      phrase += str[i].toUpperCase();
    } else {
      phrase += str[i];
    }
  }
  return phrase;
};

const convertTemperature = function (val, mode) {
  if (mode === "C") {
    return Math.round(val - 273.15);
  } else {
    return Math.round(((val - 273.15) * 9) / 5 + 32);
  }
};

const processData = async function (weatherJSON) {
  if (weatherJSON.notFoundMsg){
    return (
      {
        notFoundMsg: weatherJSON.notFoundMsg,
        locationName: currentData.locationName,
        description: currentData.description,
        id: currentData.id,
        C: {
          locationTemp: currentData.C.locationTemp,
          locationFeels: currentData.C.locationFeels,
          low: currentData.C.low,
          high: currentData.C.high
        },
        F: {
          locationTemp: currentData.F.locationTemp,
          locationFeels: currentData.F.locationFeels,
          low: currentData.F.low,
          high: currentData.F.high
        }
      }
    )
 
    return weatherJSON;
  } else {
    return (
      {
        locationName: weatherJSON.name,
        description: capitalize(weatherJSON.weather[0].description),
        id: String(weatherJSON.weather[0].id),
        C: {
          locationTemp: convertTemperature(weatherJSON.main.temp, "C"),
          locationFeels: convertTemperature(weatherJSON.main.feels_like,  "C"),
          low: convertTemperature(weatherJSON.main.temp_min,  "C"),
          high: convertTemperature(weatherJSON.main.temp_max,  "C")
        },
        F: {
          locationTemp: convertTemperature(weatherJSON.main.temp,  "F"),
          locationFeels: convertTemperature(weatherJSON.main.feels_like,  "F"),
          low: convertTemperature(weatherJSON.main.temp_min,  "F"),
          high: convertTemperature(weatherJSON.main.temp_max,  "F")
        }
      }
    )
  }
}
 
export default processData;