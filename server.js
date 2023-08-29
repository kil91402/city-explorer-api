"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const { getWeather } = require("./weather");
const { searchMovies } = require("./movies");

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/weather", async (req, res) => {
  const locationLat = req.query.lat;
  const locationLon = req.query.lon;

  if (!locationLat || !locationLon) {
    return res.status(400).json({ error: "Missing query parameters." });
  }

  try {
    const forecast = await getWeather(locationLat, locationLon);
    res.json(forecast);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

app.get("/movies", async (req, res) => {
  const searchQuery = req.query.query;

  if (!searchQuery) {
    return res.status(400).json({ error: "Missing query parameters." });
  }

  try {
    const movies = await searchMovies(searchQuery);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    return res.status(500).json({ error: "Failed to fetch movie data." });
  }
});

app.listen(3000, () => {
  console.log("Listen on port 3000...");
});
