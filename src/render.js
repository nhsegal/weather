const body = document.querySelector("body");
const location = document.querySelector("#location");
const temperature = document.querySelector("#temperature");
const feelsLike = document.querySelector("#feels-like");
const weatherDescription = document.querySelector("#weather-description");
const highLow = document.querySelector("#high-low");
const errMsg = document.querySelector("#not-found");
const myContainer = document.querySelector("#my-container");

let currentLocation = "London";

const setBackground = function (id) {
  // Thunderstorm
  if (id[0] === "2") {
    body.style.backgroundImage = "url('./imgs/thunderstorm.webp')";
    body.style.color = "white";
    myContainer.style.color = "white"
    return;
  }
  // Drizzle
  if (id[0] === "3") {
    body.style.backgroundImage = "url('./imgs/drizzle.webp')";
    body.style.color = "white";
    myContainer.style.color = "white"
    return;
  }
  // Rain
  if (id[0] === "5") {
    body.style.backgroundImage = "url('./imgs/rain.webp')";
    body.style.color = "white";
    myContainer.style.color = "white"
    return;
  }
  // Snow
  if (id[0] === "6") {
    body.style.backgroundImage = "url('./imgs/snow.jpeg')";
    body.style.color = "black";
    myContainer.style.color = "black";
    return;
  }
  // Smoke/Haze/Fog
  if (id[0] === "7") {
    body.style.backgroundImage = "url('./imgs/fog.jpeg')";
    body.style.color = "black";
    myContainer.style.color = "black";
    return;
  }
  // Clear
  if (id === "800") {
    body.style.backgroundImage = "url('./imgs/clear.jpeg')";
    body.style.color = "white";
    myContainer.style.color = "white"
    return;
  }
  // Clouds
  if (id > "800") {
    body.style.backgroundImage = "url('./imgs/clouds.jpeg')";
    body.style.color = "white";
    myContainer.style.color = "white"
    return;
  }
};

const render = async function (processedData, mode) {
  const content = await processedData;
  console.log(content);
  if (content.notFoundMsg){
    errMsg.textContent = "I couldn't find that location. Please try another search."
  }
  else {
    errMsg.textContent = " "
  } 
  setBackground(processedData.id);
  location.textContent = processedData.locationName;
  currentLocation = processedData.locationName;
  weatherDescription.textContent = processedData.description;
  if (mode === "C") {
    temperature.innerHTML = `${processedData.C.locationTemp}&#176`;
    feelsLike.innerHTML = `Feels like ${processedData.C.locationFeels}&#176`;
    highLow.innerHTML = `H: ${processedData.C.low}&#176 L: ${processedData.C.high}&#176`;
  } else if (mode === "F") {
    temperature.innerHTML = `${processedData.F.locationTemp}&#176`;
    feelsLike.innerHTML = `Feels like ${processedData.F.locationFeels}&#176`;
    highLow.innerHTML = `H: ${processedData.F.low}&#176 L: ${processedData.F.high}&#176`;
  }
};

export default render;
