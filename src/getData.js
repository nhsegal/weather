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

export default getData;
