const { truncate } = require("fs");
const http = require("http");
const request = require("request");
//const http = require("http");

const address = process.argv[2];
if (!address) {
  console.log("Nereye bakayım yazmadın.");
  return;
} else {
  const URL = `http://api.weatherstack.com/current?access_key=f008b681fdd3ffdbf2d82d720ed732c4&query=${address}`;

  request({ url: URL, json: true }, (err, res) => {
    const { weather_descriptions, temperature } = res.body.current;
    //const desc = body.weather_descriptions;
    //const temp = body.temperature;

    console.log(
      `Today weather is ${weather_descriptions} and temperature is ${temperature} °C`
    );
  });
}
