const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(express.json());

const weatherData = JSON.parse(fs.readFileSync("data/weather.json", "utf8"));

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

// app.get("/weather", (req, res) => {
//   const { lat, lon, searchQuery } = req.query;

//   const cityData = weatherData.find(
//     (city) =>
//       (lat && lon && city.lat === lat && city.lon === lon) ||
//       (searchQuery &&
//         city.city_name.toLowerCase() === searchQuery.toLowerCase())
//   );

//   if (!cityData) {
//     return res.status(404).json({ error: "City not found" });
//   }

// const forecasts = cityData.data.map((data) => {
//   const forecast = new Forecast(data.datetime, data.weather.description);
//   return forecast;
// });

app.get("/weather", async (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing query parameters." });
  }

  try {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherApiKey}`;
    const apiResponse = await axios.get(apiUrl);

    const forecast = apiResponse.data.forecast.map((item) => {
      return new Forecast(item.date, item.description);
    });

    res.json(forecast);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return res.status(500).json({ error: "Failed to fetch weather data." });
  }
});
//});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
