const getData = async function (loc) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=fb777603204d1d82c91eb0c68a45ed41`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch {
    (error) => {
      console.log("Error:", error);
    };
  }
};

export default getData;
