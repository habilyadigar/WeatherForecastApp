console.log("OLUM YAZSANA ŞURAYA");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");

const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  //console.log(searchInput.value);
  fetch(`http://localhost:3000/current?address=${city}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p1.textContent = `ERROR: ${data.error}`;
        p2.textContent = "";
      } else {
        p1.textContent = `City: ${data.address}`;
        p2.textContent = `Weather: ${data.weather}`;
      }
    });
  });
});
