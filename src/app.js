const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");
require("dotenv").config();
const ACCESS_KEY = process.env.ACCESS_KEY;

const app = express();

const publicPathUrl = path.join(__dirname, "../public");
const templatesPathUrl = path.join(__dirname, "../templates");
const partialsPathUrl = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templatesPathUrl);

//partialsı import ediyoruz.
hbs.registerPartials(partialsPathUrl);

//public klasörünü servis et
app.use(express.static(publicPathUrl));

app.get("/", (req, res) => {
  res.render("index", {
    title: "CURRENT WEATHER INFORMATION",
  });
});
/*
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About PAGE",
  });
});
*/

app.get("/current", (req, res) => {
  const address = req.query["address"];
  if (!address) {
    return res.send({
      error: "You must enter address.",
    });
  } else {
    const URL = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${address}`;

    request({ url: URL, json: true }, (err, response) => {
      const request = !response.body["request"];
      //console.log(response);
      if (request) {
        res.send({
          error: "CITY IS NOT FOUND",
        });
      } else {
        //console.log(response.body);
        const {
          weather_descriptions,
          temperature,
          feelslike,
          wind_speed,
          uv_index,
          visibility,
          //weather_icons,
        } = response.body.current;
        res.send({
          address: req.query.address,
          weather: {
            weather_descriptions,
            temperature,
            feelslike,
            wind_speed,
            uv_index,
            visibility,
            //weather_icons,
          },
        });
      }
    });
  }
});

app.get("*", (req, res) => {
  res.render("404page");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
