const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
app.use(cors());
app.use(express.json());

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
  const locationLat = req.query.lat;
  const locationLon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  console.log(locationLat, locationLon, searchQuery);

  if (!locationLat || !locationLon) {
    return res.status(400).json({ error: "Missing query parameters." });
  }
  console.log("hello");
  try {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationLat}&lon=${locationLon}&key=${weatherApiKey}&days=16`;
    console.log("hello again");
    console.log(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationLat}&lon=${locationLon}&key=${weatherApiKey}&days=16`
    );
    console.log("how are you");
    const apiResponse = await axios.get(url);

    console.log("hello there");
    const forecast = apiResponse.data.data.map((item) => {
      return new Forecast(item.datetime, item.weather.description);
    });
    console.log(forecast);
    res.json(forecast);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

class Movie {
  constructor(title, release_date, overview, imgURL) {
    this.title = title;
    this.release_date = release_date;
    this.overview = overview;
    this.imgURL = imgURL;
  }
}

app.get("/movies", async (req, res) => {
  const searchQuery = req.query.query; // Use "query" instead of "searchQuery"
  if (!searchQuery) {
    return res.status(400).json({ error: "Missing query parameters." });
  }

  try {
    const movieApiKey = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${searchQuery}`;
    const apiResponse = await axios.get(url);

    const movies = apiResponse.data.results.map((movie) => {
      return new Movie(
        movie.title,
        movie.release_date,
        movie.overview,
        movie.imgURL
      );
    });

    res.json(movies);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    return res.status(500).json({ error: "Failed to fetch movie data." });
  }
});

app.get("/movies", async (req, res) => {
  const searchQuery = req.query.query;
  if (!searchQuery) {
    return res.status(400).json({ error: "Missing query parameters." });
  }

  try {
    const movieApiKey = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${searchQuery}`;
    const apiResponse = await axios.get(url);

    const movies = apiResponse.data.results.map((movie) => {
      return new Movie(
        movie.title,
        movie.release_date,
        movie.overview,
        movie.imgURL
      );
    });

    res.json(movies);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    return res.status(500).json({ error: "Failed to fetch movie data." });
  }
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
