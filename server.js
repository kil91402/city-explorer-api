const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const weatherData = require("./weather.json");

app.use(express.json());

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

module.exports = Forecast;

app.get("/weather", (req, res) => {
  const { lat, lon, searchQuery } = req.query;
  const cityData = weatherData.find((city) => {
    return (
      city.lat === parseFloat(lat) &&
      city.lon === parseFloat(lon) &&
      city.city_name.toLowerCase() === searchQuery.toLowerCase()
    );
  });

  if (!cityData) {
    return res.status(404).json({ error: "City not found in weather data." });
  }

  const forecast = cityData.forecast.map((item) => ({
    date: item.date,
    description: item.description,
  }));

  res.json(forecast);
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
