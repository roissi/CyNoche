// Import the axios library, which is used to make HTTP requests
import axios from 'axios';

// An async function to fetch data for a specific movie from TMDB
export const fetchMovieDetailsFromTMDB = async (id) => {
  // Request the movie data from your local server
  const response = await axios.get(`http://localhost:4500/movies/${id}`);
  // Extract the movie object from the response
  const movie = response.data.movie;

  // Make another request to the TMDB API for additional movie data
  const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
  // Extract the TMDB movie data from the response
  const movieData = tmdbResponse.data;
  // Construct a URL for the movie's poster
  const posterUrl = movieData.poster_path ? `https://image.tmdb.org/t/p/original${movieData.poster_path}` : null;
  // Add the poster URL to the movie data
  movieData.posterUrl = posterUrl;

  // Log the movie data to the console
  console.log('TMDB movie details:', movieData);

  // Return the TMDB movie data
  return movieData;
};

// An async function to fetch all movies from your local server
export const fetchMovieFromDatabase = async (id) => {
  const url = `http://localhost:4500/movies/${id}`;
  console.log(`Fetching movie from ${url}`); // Add a log before the request
  // Request the movie data from your local server
  const response = await axios.get(url);
  // Extract the movie array from the response
  const movie = response.data.movie;

  // Log each movie's details
  console.log(`Fetched movies:`, movie);

  return movie;
};

// An async function to fetch all movies from your local server
export const fetchThumbnailsFromDatabase = async () => {
  const url = `http://localhost:4500/movies`;
  console.log(`Fetching all movies from ${url}`); // Add a log before the request
  // Request the movie data from your local server
  const response = await axios.get(url);
  // Extract the movie array from the response
  const movies = response.data.movies;

  // Log each movie's details
  console.log(`Fetched movies:`, movies);

  return movies;
};