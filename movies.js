'use strict';

const axios = require('axios');
const Movie = require('./models/Movie'); 

async function searchMovies(searchQuery) {
  try {
    const movieApiKey = process.env.MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${searchQuery}`;
    const apiResponse = await axios.get(url);

    const movies = apiResponse.data.results.map((movie) => {
      return new Movie(movie.title, movie.release_date, movie.overview, movie.poster_path);
    });

    return movies;
  } catch (error) {
    throw new Error('Failed to fetch movie data.');
  }
}

module.exports = { searchMovies };
