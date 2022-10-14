const capitalize = function (str) {
  console.log(str)
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
)}
 
export default processData;