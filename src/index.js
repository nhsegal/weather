import getData from './getData.js';
import render from './render.js';

const btn = document.querySelector("button");
const inp = document.querySelector("input");

const getWeatherHere = async function () {
   let data = await getData(inp.value);
   await render(data);
}

let asdfa = getData('London').then((e) => render(e));
btn.addEventListener("click", getWeatherHere);

