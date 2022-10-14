const body = document.querySelector("body");

const render = async function (weatherJSON) {
    const location = await weatherJSON.name;
    const city = document.createElement('h1');
    city.textContent= location;
    body.append(city);
    console.log('asdfas')
}


export default render;