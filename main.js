/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/getData.js":
/*!************************!*\
  !*** ./src/getData.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getData = async function (loc) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=fb777603204d1d82c91eb0c68a45ed41`,
      { mode: "cors" }
    );
    if (response.status === 404) { 
      const notFound = { notFoundMsg: "I couldn't find that location." };
      console.log(response.status)
      console.log(notFound)
      return notFound;
    } else {
      const weatherData = await response.json();
      return weatherData;
    }
  } catch {
    (error) => {
      console.log("Error:", error);
    };
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getData);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentData": () => (/* binding */ currentData)
/* harmony export */ });
/* harmony import */ var _getData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getData.js */ "./src/getData.js");
/* harmony import */ var _processData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processData.js */ "./src/processData.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ "./src/render.js");




const btn = document.querySelector("button");
const inp = document.querySelector("#location-search");
const units = document.querySelectorAll('input[type=radio]');
let currentData = null;
let currentMode = "C"


const getWeatherHere = async function () {
   let rawData = await (0,_getData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(inp.value);
   currentData = await (0,_processData_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rawData);
   await (0,_render_js__WEBPACK_IMPORTED_MODULE_2__["default"])(currentData, currentMode);
}

;(0,_getData_js__WEBPACK_IMPORTED_MODULE_0__["default"])('London').then((e) => (0,_processData_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e))
   .then((e) => {
      currentData = e;
      currentMode = "C";
      (0,_render_js__WEBPACK_IMPORTED_MODULE_2__["default"])(e, currentMode)});

btn.addEventListener("click", getWeatherHere);
units[0].onclick = function (){ currentMode="C";  (0,_render_js__WEBPACK_IMPORTED_MODULE_2__["default"])(currentData, "C")}
units[1].onclick = function (){ currentMode="F"; (0,_render_js__WEBPACK_IMPORTED_MODULE_2__["default"])(currentData, "F")}

/***/ }),

/***/ "./src/processData.js":
/*!****************************!*\
  !*** ./src/processData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");


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
        locationName: ___WEBPACK_IMPORTED_MODULE_0__.currentData.locationName,
        description: ___WEBPACK_IMPORTED_MODULE_0__.currentData.description,
        id: ___WEBPACK_IMPORTED_MODULE_0__.currentData.id,
        C: {
          locationTemp: ___WEBPACK_IMPORTED_MODULE_0__.currentData.C.locationTemp,
          locationFeels: ___WEBPACK_IMPORTED_MODULE_0__.currentData.C.locationFeels,
          low: ___WEBPACK_IMPORTED_MODULE_0__.currentData.C.low,
          high: ___WEBPACK_IMPORTED_MODULE_0__.currentData.C.high
        },
        F: {
          locationTemp: ___WEBPACK_IMPORTED_MODULE_0__.currentData.F.locationTemp,
          locationFeels: ___WEBPACK_IMPORTED_MODULE_0__.currentData.F.locationFeels,
          low: ___WEBPACK_IMPORTED_MODULE_0__.currentData.F.low,
          high: ___WEBPACK_IMPORTED_MODULE_0__.currentData.F.high
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
 
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (processData);

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9nZXREYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9wcm9jZXNzRGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldERhdGEgPSBhc3luYyBmdW5jdGlvbiAobG9jKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2N9JkFQUElEPWZiNzc3NjAzMjA0ZDFkODJjOTFlYjBjNjhhNDVlZDQxYCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7IFxuICAgICAgY29uc3Qgbm90Rm91bmQgPSB7IG5vdEZvdW5kTXNnOiBcIkkgY291bGRuJ3QgZmluZCB0aGF0IGxvY2F0aW9uLlwiIH07XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpXG4gICAgICBjb25zb2xlLmxvZyhub3RGb3VuZClcbiAgICAgIHJldHVybiBub3RGb3VuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gd2VhdGhlckRhdGE7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6XCIsIGVycm9yKTtcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXREYXRhO1xuIiwiaW1wb3J0IGdldERhdGEgZnJvbSAnLi9nZXREYXRhLmpzJztcbmltcG9ydCBwcm9jZXNzRGF0YSBmcm9tICcuL3Byb2Nlc3NEYXRhLmpzJztcbmltcG9ydCByZW5kZXIgZnJvbSAnLi9yZW5kZXIuanMnO1xuXG5jb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xuY29uc3QgaW5wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbi1zZWFyY2hcIik7XG5jb25zdCB1bml0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmFkaW9dJyk7XG5leHBvcnQgbGV0IGN1cnJlbnREYXRhID0gbnVsbDtcbmxldCBjdXJyZW50TW9kZSA9IFwiQ1wiXG5cblxuY29uc3QgZ2V0V2VhdGhlckhlcmUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICBsZXQgcmF3RGF0YSA9IGF3YWl0IGdldERhdGEoaW5wLnZhbHVlKTtcbiAgIGN1cnJlbnREYXRhID0gYXdhaXQgcHJvY2Vzc0RhdGEocmF3RGF0YSk7XG4gICBhd2FpdCByZW5kZXIoY3VycmVudERhdGEsIGN1cnJlbnRNb2RlKTtcbn1cblxuZ2V0RGF0YSgnTG9uZG9uJykudGhlbigoZSkgPT4gcHJvY2Vzc0RhdGEoZSkpXG4gICAudGhlbigoZSkgPT4ge1xuICAgICAgY3VycmVudERhdGEgPSBlO1xuICAgICAgY3VycmVudE1vZGUgPSBcIkNcIjtcbiAgICAgIHJlbmRlcihlLCBjdXJyZW50TW9kZSl9KTtcblxuYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRXZWF0aGVySGVyZSk7XG51bml0c1swXS5vbmNsaWNrID0gZnVuY3Rpb24gKCl7IGN1cnJlbnRNb2RlPVwiQ1wiOyAgcmVuZGVyKGN1cnJlbnREYXRhLCBcIkNcIil9XG51bml0c1sxXS5vbmNsaWNrID0gZnVuY3Rpb24gKCl7IGN1cnJlbnRNb2RlPVwiRlwiOyByZW5kZXIoY3VycmVudERhdGEsIFwiRlwiKX0iLCJpbXBvcnQgeyBjdXJyZW50RGF0YSB9IGZyb20gXCIuXCI7XG5cbmNvbnN0IGNhcGl0YWxpemUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIGxldCBwaHJhc2UgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpID09PSAwIHx8IHN0cltpIC0gMV0gPT09IFwiIFwiKSB7XG4gICAgICBwaHJhc2UgKz0gc3RyW2ldLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBocmFzZSArPSBzdHJbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBwaHJhc2U7XG59O1xuXG5jb25zdCBjb252ZXJ0VGVtcGVyYXR1cmUgPSBmdW5jdGlvbiAodmFsLCBtb2RlKSB7XG4gIGlmIChtb2RlID09PSBcIkNcIikge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbCAtIDI3My4xNSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoKCh2YWwgLSAyNzMuMTUpICogOSkgLyA1ICsgMzIpO1xuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh3ZWF0aGVySlNPTikge1xuICBpZiAod2VhdGhlckpTT04ubm90Rm91bmRNc2cpe1xuICAgIHJldHVybiAoXG4gICAgICB7XG4gICAgICAgIG5vdEZvdW5kTXNnOiB3ZWF0aGVySlNPTi5ub3RGb3VuZE1zZyxcbiAgICAgICAgbG9jYXRpb25OYW1lOiBjdXJyZW50RGF0YS5sb2NhdGlvbk5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBjdXJyZW50RGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgaWQ6IGN1cnJlbnREYXRhLmlkLFxuICAgICAgICBDOiB7XG4gICAgICAgICAgbG9jYXRpb25UZW1wOiBjdXJyZW50RGF0YS5DLmxvY2F0aW9uVGVtcCxcbiAgICAgICAgICBsb2NhdGlvbkZlZWxzOiBjdXJyZW50RGF0YS5DLmxvY2F0aW9uRmVlbHMsXG4gICAgICAgICAgbG93OiBjdXJyZW50RGF0YS5DLmxvdyxcbiAgICAgICAgICBoaWdoOiBjdXJyZW50RGF0YS5DLmhpZ2hcbiAgICAgICAgfSxcbiAgICAgICAgRjoge1xuICAgICAgICAgIGxvY2F0aW9uVGVtcDogY3VycmVudERhdGEuRi5sb2NhdGlvblRlbXAsXG4gICAgICAgICAgbG9jYXRpb25GZWVsczogY3VycmVudERhdGEuRi5sb2NhdGlvbkZlZWxzLFxuICAgICAgICAgIGxvdzogY3VycmVudERhdGEuRi5sb3csXG4gICAgICAgICAgaGlnaDogY3VycmVudERhdGEuRi5oaWdoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gXG4gICAgcmV0dXJuIHdlYXRoZXJKU09OO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoXG4gICAgICB7XG4gICAgICAgIGxvY2F0aW9uTmFtZTogd2VhdGhlckpTT04ubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGNhcGl0YWxpemUod2VhdGhlckpTT04ud2VhdGhlclswXS5kZXNjcmlwdGlvbiksXG4gICAgICAgIGlkOiBTdHJpbmcod2VhdGhlckpTT04ud2VhdGhlclswXS5pZCksXG4gICAgICAgIEM6IHtcbiAgICAgICAgICBsb2NhdGlvblRlbXA6IGNvbnZlcnRUZW1wZXJhdHVyZSh3ZWF0aGVySlNPTi5tYWluLnRlbXAsIFwiQ1wiKSxcbiAgICAgICAgICBsb2NhdGlvbkZlZWxzOiBjb252ZXJ0VGVtcGVyYXR1cmUod2VhdGhlckpTT04ubWFpbi5mZWVsc19saWtlLCAgXCJDXCIpLFxuICAgICAgICAgIGxvdzogY29udmVydFRlbXBlcmF0dXJlKHdlYXRoZXJKU09OLm1haW4udGVtcF9taW4sICBcIkNcIiksXG4gICAgICAgICAgaGlnaDogY29udmVydFRlbXBlcmF0dXJlKHdlYXRoZXJKU09OLm1haW4udGVtcF9tYXgsICBcIkNcIilcbiAgICAgICAgfSxcbiAgICAgICAgRjoge1xuICAgICAgICAgIGxvY2F0aW9uVGVtcDogY29udmVydFRlbXBlcmF0dXJlKHdlYXRoZXJKU09OLm1haW4udGVtcCwgIFwiRlwiKSxcbiAgICAgICAgICBsb2NhdGlvbkZlZWxzOiBjb252ZXJ0VGVtcGVyYXR1cmUod2VhdGhlckpTT04ubWFpbi5mZWVsc19saWtlLCAgXCJGXCIpLFxuICAgICAgICAgIGxvdzogY29udmVydFRlbXBlcmF0dXJlKHdlYXRoZXJKU09OLm1haW4udGVtcF9taW4sICBcIkZcIiksXG4gICAgICAgICAgaGlnaDogY29udmVydFRlbXBlcmF0dXJlKHdlYXRoZXJKU09OLm1haW4udGVtcF9tYXgsICBcIkZcIilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgfVxufVxuIFxuZXhwb3J0IGRlZmF1bHQgcHJvY2Vzc0RhdGE7IiwiY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uXCIpO1xuY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBlcmF0dXJlXCIpO1xuY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmZWVscy1saWtlXCIpO1xuY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyLWRlc2NyaXB0aW9uXCIpO1xuY29uc3QgaGlnaExvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGlnaC1sb3dcIik7XG5jb25zdCBlcnJNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25vdC1mb3VuZFwiKTtcbmNvbnN0IG15Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNteS1jb250YWluZXJcIik7XG5cbmxldCBjdXJyZW50TG9jYXRpb24gPSBcIkxvbmRvblwiO1xuXG5jb25zdCBzZXRCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKGlkKSB7XG4gIC8vIFRodW5kZXJzdG9ybVxuICBpZiAoaWRbMF0gPT09IFwiMlwiKSB7XG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWdzL3RodW5kZXJzdG9ybS53ZWJwJylcIjtcbiAgICBib2R5LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIG15Q29udGFpbmVyLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiXG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIERyaXp6bGVcbiAgaWYgKGlkWzBdID09PSBcIjNcIikge1xuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1ncy9kcml6emxlLndlYnAnKVwiO1xuICAgIGJvZHkuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgbXlDb250YWluZXIuc3R5bGUuY29sb3IgPSBcIndoaXRlXCJcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gUmFpblxuICBpZiAoaWRbMF0gPT09IFwiNVwiKSB7XG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWdzL3JhaW4ud2VicCcpXCI7XG4gICAgYm9keS5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBteUNvbnRhaW5lci5zdHlsZS5jb2xvciA9IFwid2hpdGVcIlxuICAgIHJldHVybjtcbiAgfVxuICAvLyBTbm93XG4gIGlmIChpZFswXSA9PT0gXCI2XCIpIHtcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZ3Mvc25vdy5qcGVnJylcIjtcbiAgICBib2R5LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgIG15Q29udGFpbmVyLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBTbW9rZS9IYXplL0ZvZ1xuICBpZiAoaWRbMF0gPT09IFwiN1wiKSB7XG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWdzL2ZvZy5qcGVnJylcIjtcbiAgICBib2R5LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgIG15Q29udGFpbmVyLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBDbGVhclxuICBpZiAoaWQgPT09IFwiODAwXCIpIHtcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZ3MvY2xlYXIuanBlZycpXCI7XG4gICAgYm9keS5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBteUNvbnRhaW5lci5zdHlsZS5jb2xvciA9IFwid2hpdGVcIlxuICAgIHJldHVybjtcbiAgfVxuICAvLyBDbG91ZHNcbiAgaWYgKGlkID4gXCI4MDBcIikge1xuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1ncy9jbG91ZHMuanBlZycpXCI7XG4gICAgYm9keS5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBteUNvbnRhaW5lci5zdHlsZS5jb2xvciA9IFwid2hpdGVcIlxuICAgIHJldHVybjtcbiAgfVxufTtcblxuY29uc3QgcmVuZGVyID0gYXN5bmMgZnVuY3Rpb24gKHByb2Nlc3NlZERhdGEsIG1vZGUpIHtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IHByb2Nlc3NlZERhdGE7XG4gIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xuICBpZiAoY29udGVudC5ub3RGb3VuZE1zZyl7XG4gICAgZXJyTXNnLnRleHRDb250ZW50ID0gXCJJIGNvdWxkbid0IGZpbmQgdGhhdCBsb2NhdGlvbi4gUGxlYXNlIHRyeSBhbm90aGVyIHNlYXJjaC5cIlxuICB9XG4gIGVsc2Uge1xuICAgIGVyck1zZy50ZXh0Q29udGVudCA9IFwiIFwiXG4gIH0gXG4gIHNldEJhY2tncm91bmQocHJvY2Vzc2VkRGF0YS5pZCk7XG4gIGxvY2F0aW9uLnRleHRDb250ZW50ID0gcHJvY2Vzc2VkRGF0YS5sb2NhdGlvbk5hbWU7XG4gIGN1cnJlbnRMb2NhdGlvbiA9IHByb2Nlc3NlZERhdGEubG9jYXRpb25OYW1lO1xuICB3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9jZXNzZWREYXRhLmRlc2NyaXB0aW9uO1xuICBpZiAobW9kZSA9PT0gXCJDXCIpIHtcbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBgJHtwcm9jZXNzZWREYXRhLkMubG9jYXRpb25UZW1wfSYjMTc2YDtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gYEZlZWxzIGxpa2UgJHtwcm9jZXNzZWREYXRhLkMubG9jYXRpb25GZWVsc30mIzE3NmA7XG4gICAgaGlnaExvdy5pbm5lckhUTUwgPSBgSDogJHtwcm9jZXNzZWREYXRhLkMubG93fSYjMTc2IEw6ICR7cHJvY2Vzc2VkRGF0YS5DLmhpZ2h9JiMxNzZgO1xuICB9IGVsc2UgaWYgKG1vZGUgPT09IFwiRlwiKSB7XG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gYCR7cHJvY2Vzc2VkRGF0YS5GLmxvY2F0aW9uVGVtcH0mIzE3NmA7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IGBGZWVscyBsaWtlICR7cHJvY2Vzc2VkRGF0YS5GLmxvY2F0aW9uRmVlbHN9JiMxNzZgO1xuICAgIGhpZ2hMb3cuaW5uZXJIVE1MID0gYEg6ICR7cHJvY2Vzc2VkRGF0YS5GLmxvd30mIzE3NiBMOiAke3Byb2Nlc3NlZERhdGEuRi5oaWdofSYjMTc2YDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==