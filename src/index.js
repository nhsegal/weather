import getData from './getData.js';
import processData from './processData.js';
import render from './render.js';

const btn = document.querySelector("button");
const inp = document.querySelector("#location-search");
const units = document.querySelectorAll('input[type=radio]');
export let currentData = null;
let currentMode = "C"


const getWeatherHere = async function () {
   let rawData = await getData(inp.value);
   currentData = await processData(rawData);
   await render(currentData, currentMode);
}

getData('London').then((e) => processData(e))
   .then((e) => {
      currentData = e;
      currentMode = "C";
      render(e, currentMode)});

btn.addEventListener("click", getWeatherHere);
units[0].onclick = function (){ currentMode="C";  render(currentData, "C")}
units[1].onclick = function (){ currentMode="F"; render(currentData, "F")}