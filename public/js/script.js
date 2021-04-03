console.log("OLUM YAZSANA ŞURAYA");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  console.log(searchInput.value);
  fetch(`http://localhost:3000/forecast?address=${city}`).then((response) => {
    response.json().then((data) => {
      console.log(data);
    });
  });
});
