// Import necessary modules
import dataMapper from "./app/model/dataMapper.js"; // Path to your dataMapper file
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

// Define a function to get TMDB data for a movie
async function getTmdbDataForMovie(movie, type = 'movie') {
  try {
    // Clean movie name by removing accents, articles and punctuation
    const cleanedMovieName = movie.name
      .normalize('NFD') // Decompose accented characters into their base form and accent
      .replace(/æ/g, 'ae') // Replace 'æ' with 'ae'
      .replace(/œ/g, 'oe') // Replace 'œ' with 'oe'
      .replace(/[\u0300-\u036f]/g, '') // Remove all diacritical signs
      .toLowerCase()
      .replace(/^(le|la|les|un|une|des)\s+/i, '') // Remove definite and indefinite articles in French
      .replace(/[-:][^]+$/, '') // Remove everything after ':' or '-'
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\s+/g, ' '); // Replace multiple spaces with a single space

    // Make an API request to TMDB to get movie data in English
    let responseEn = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
        cleanedMovieName
      )}&year=${movie.year}&language=en`
    );

    // If no result found, try to search for TV series data instead
    if (!responseEn.data.results || responseEn.data.results.length === 0) {
      responseEn = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
          cleanedMovieName
        )}&year=${movie.year}&language=en`
      );
    }

    // Make an API request to TMDB to get movie data in French
    let responseFr = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
        cleanedMovieName
      )}&year=${movie.year}&language=fr`
    );

    // If no result found, try to search for TV series data instead
    if (!responseFr.data.results || responseFr.data.results.length === 0) {
      responseFr = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
          cleanedMovieName
        )}&year=${movie.year}&language=fr`
      );
    }

    // Get the first result from both responses
    const tmdbDataEn = responseEn.data.results[0];
    const tmdbDataFr = responseFr.data.results[0];

    // If no data found, log the movie name and return null
    if (!tmdbDataEn || !tmdbDataFr) {
      console.log(`No TMDB data found for movie: ${movie.name}`);
      return null;
    }

    // Return TMDB movie ID and details
    return {
      id: tmdbDataEn.id,
      details_en: tmdbDataEn.overview,
      details_fr: tmdbDataFr.overview
    };
  } catch (error) {
    // If an error occurs, log it and return null
    console.error(`Error fetching TMDB data for movie: ${movie.name}`, error);
    return null;
  }
}

// Define a function to update movie IDs in your database
async function updateMovieIds() {
  // Fetch all movies from the database
  const movies = await dataMapper.getAllMovies();

  for (let movie of movies) {
    // Fetch movie details from the TMDB API
    const tmdbData = await getTmdbDataForMovie(movie);

    if (tmdbData) {
      // Update the movie's ID and details in the database
      await dataMapper.updateMovie(movie.id, { 
        tmdb_id: tmdbData.id,
        overview_en: tmdbData.details_en,
        overview_fr: tmdbData.details_fr
      });
      console.log(`Updated TMDB ID and details for movie: ${movie.name}`);
    } else {
      console.log(`No TMDB data found for movie: ${movie.name}`);
    }
  }
  
  // Close the database connection when done
  dataMapper.closeConnection();
}

// Call the function to start the process
updateMovieIds();