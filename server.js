const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(express.json());

const weatherData = JSON.parse(fs.readFileSync("data/weather.json", "utf8"));

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get("/weather", (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  const cityData = weatherData.find(
    (city) =>
      (lat && lon && city.lat === lat && city.lon === lon) ||
      (searchQuery &&
        city.city_name.toLowerCase() === searchQuery.toLowerCase())
  );

  if (!cityData) {
    return res.status(404).json({ error: "City not found" });
  }

  const forecasts = cityData.data.map((data) => {
    const forecast = new Forecast(data.datetime, data.weather.description);
    return forecast;
  });

  res.json(forecasts);
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
