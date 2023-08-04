const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(express.json());

const weatherData = JSON.parse(fs.readFileSync("data/weather.json", "utf8"));

// ... (existing code)

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/weather", async (req, res) => {
  const { locationLat, locationLon, searchQuery } = req.query;
  const cityData = weatherData.find(
    (city) =>
      (locationLat &&
        locationLon &&
        city.lat === locationLat &&
        city.lon === locationLon) ||
      (searchQuery &&
        city.city_name.toLowerCase() === searchQuery.toLowerCase())
  );

  if (!locationLat || !locationLon) {
    return res.status(400).json({ error: "Missing query parameters." });
  }

  try {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const apiResponse = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationLat}&lon=${locationLon}&key=${weatherApiKey}&days=3`
    );

    const forecast = apiResponse.data.data.map((item) => {
      return new Forecast(item.datetime, item.weather.description);
    });

    res.json(forecast);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
