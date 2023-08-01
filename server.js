const express = require("express");
const cors = require("cors");
const app = express();

const data = require("./data/weather.json");

class Forecast {
  constructor(ForecastObj) {
    this.data.valid_date = ForecastObj.data.valid_date;
    this.data.data.weather.description = ForecastObj.weather.description;
    this.data.city_name = ForecastObj.data.city_name;
  }
}

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/weather", (request, response) => {
  const extractedData = data.map((data) => {
    return {
      city_name: data.city_name,
      valid_date: data.data[0].valid_date,
      description: data.data[0].weather.description,
    };
  });

  response.send(extractedData);
});

app.get("/weather/:city", (request, response) => {
  const { city } = request.params;
  const cityData = data.find((data) => data.city_name === city);

  if (cityData) {
    const { city_name, valid_date, description } = cityData;
    response.send({ city_name, valid_date, description });
  } else {
    response.status(404).send("City not found.");
  }
});

app.get("/weather/:city", (request, response) => {
  const { city } = request.params;
  const cityData = data.find((data) => data.city_name === city);

  if (cityData) {
    const forecast = cityData.data.map((data) => new Forecast(data));
    response.send(forecast);
  } else {
    response.status(404).send("City not found.");
  }
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
