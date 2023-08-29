'use strict';

const axios = require('axios');
const Forecast = require('./models/Forecast'); // Make sure to adjust the path accordingly

async function getWeather(locationLat, locationLon) {
  try {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationLat}&lon=${locationLon}&key=${weatherApiKey}&days=16`;
    const apiResponse = await axios.get(url);

    const forecast = apiResponse.data.data.map((item) => {
      return new Forecast(item.datetime, item.weather.description);
    });

    return forecast;
  } catch (error) {
    throw new Error('Failed to fetch weather data.');
  }
}

module.exports = { getWeather };


