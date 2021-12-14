require('dotenv').config();

const movieConfig = {
  apiKey: process.env.THE_MOVIE_DB_API_KEY,
  apiBaseUrl: 'https://api.themoviedb.org/3/',
  imageBaseUrl: 'https://image.tmdb.org/t/p/w1280',
};
module.exports = {
  movieConfig,
};
