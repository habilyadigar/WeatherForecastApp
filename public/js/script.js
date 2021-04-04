const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");

const p1 = document.querySelector("#p1");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const windSpeed = document.querySelector("#windSpeed");
const feels = document.querySelector("#feels");
const UV = document.querySelector("#UV");
const visi = document.querySelector("#visi");
//const icon = document.URL("#icon");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  //console.log(searchInput.value);
  fetch(`http://localhost:3000/current?address=${city}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p1.textContent = `ERROR: ${data.error}`;
      } else {
        temp.textContent = `${data.weather["temperature"]} °C`;
        desc.textContent = `${data.weather["weather_descriptions"]}`;
        feels.textContent = `${data.weather["feelslike"]} °C`;
        windSpeed.textContent = `${data.weather["wind_speed"]}`;
        UV.textContent = `${data.weather["uv_index"]}`;
        visi.textContent = `${data.weather["visibility"]}`;
        p1.textContent = `${data.address}`;
        //icon.textContent = data.weather["weather_icons"];
      }
    });
  });
});
