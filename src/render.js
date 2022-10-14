

const body = document.querySelector("body");
const location = document.querySelector("#location");
const temperature = document.querySelector("#temperature");
const feelsLike = document.querySelector("#feels-like");
const weatherDescription = document.querySelector("#weather-description");
const highLow = document.querySelector("#high-low");

let currentLocation = "London";

const setBackground = function (id) {
  console.log(id)
  // Thunderstorm
  if (id[0] === "2") {
    body.style.backgroundImage = "url('./imgs/thunderstorm.webp')";
    return;
  }
  // Drizzle
  if (id[0] === "3") {
    body.style.backgroundImage = "url('./imgs/drizzle.webp')";
    return;
  }
  // Rain
  if (id[0] === "5") {
    body.style.backgroundImage = "url('./imgs/rain.webp')";
    return;
  }
  // Snow
  if (id[0] === "6") {
    body.style.backgroundImage = "url('./imgs/snow.jpeg')";
    return;
  }
  // Smoke/Haze/Fog
  if (id[0] === "7") {
    body.style.backgroundImage = "url('./imgs/fog.jpeg')";
    return;
  }
  // Clear
  if (id === "800") {
    body.style.backgroundImage = "url('./imgs/clear.jpeg')";
    return;
  }
  // Clouds
  if (id > "800") {
    body.style.backgroundImage = "url('./imgs/clouds.jpeg')";
    return;
  }
};

const render = async function (processedData, mode) {
  console.log(processedData)
  setBackground(processedData.id);
  location.textContent = processedData.locationName;
  currentLocation = processedData.locationName;
  if (mode === "C") {
    temperature.innerHTML = `${processedData.C.locationTemp}&#176`;
    feelsLike.innerHTML = `Feels like ${processedData.C.locationFeels}&#176`;
    highLow.innerHTML = `H:${processedData.C.low}&#176 L:${processedData.C.high}&#176`;
  } else if (mode === "F") {
    temperature.innerHTML = `${processedData.F.locationTemp}&#176`;
    feelsLike.innerHTML = `Feels like ${processedData.F.locationFeels}&#176`;
    highLow.innerHTML = `H:${processedData.F.low}&#176 L:${processedData.F.high}&#176`;
  }
  weatherDescription.textContent = processedData.description;
  
};


export default render;
