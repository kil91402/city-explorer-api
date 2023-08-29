'use strict';
require("dotenv").config();

class Movie {
    constructor(title, release_date, overview, imgURL) {
      this.title = title;
      this.release_date = release_date;
      this.overview = overview;
      this.poster_path = imgURL;
    }
  }
  
  module.exports = Movie;
  