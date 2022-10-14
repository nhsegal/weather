import getData from './getData.js';
import processData from './processData.js';
import render from './render.js';

const btn = document.querySelector("button");
const inp = document.querySelector("#location-search");
const units = document.querySelectorAll('input[type=radio]');
let currentData = null;


const getWeatherHere = async function () {
   let rawData = await getData(inp.value);
   currentData = await processData(rawData);
   await render(currentData);
}

getData('London').then((e) => processData(e)).then( (e) => {currentData = e ;render(e)} );

btn.addEventListener("click", getWeatherHere);
units[0].onclick = function (){ render(currentData, "C")}
units[1].onclick = function (){ render(currentData, "F")}