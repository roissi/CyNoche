const dataMapper = require("./app/model/dataMapper"); // chemin vers votre fichier dataMapper
const axios = require("axios");
require('dotenv').config();

async function getTmdbDataForMovie(movie) {
  try {
    const cleanedMovieName = movie.name
    .normalize('NFD') // décompose les caractères accentués en leur forme de base et leur accent
    .replace(/[\u0300-\u036f]/g, '') // supprime tous les signes diacritiques
    .toLowerCase()
    .replace(/[-:][^]+$/, '') // remove everything after a ':' or '-'
    .replace(/[^\w\s]/g, '') // remove punctuation
    .replace(/\s+/g, ' '); // replace multiple spaces with a single space

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
        cleanedMovieName
      )}&year=${movie.year}`
    );

    const tmdbData = response.data.results[0];

    if (!tmdbData) {
      console.log(`No TMDB data found for movie: ${movie.name}`);
      return null;
    }

    return tmdbData.id;
  } catch (error) {
    console.error(`Error fetching TMDB data for movie: ${movie.name}`, error);
    return null;
  }
}

async function updateMovieIds() {
  // Récupérer tous les films de la base de données
  const movies = await dataMapper.getAllMovies();

  for (let movie of movies) {
    // Récupérer les informations du film à partir de l'API TMDB
    const tmdbId = await getTmdbDataForMovie(movie);

    if (tmdbId) {
      // Mettre à jour l'ID du film dans la base de données
      await dataMapper.updateMovie(movie.id, { tmdb_id: tmdbId });
      console.log(`Updated TMDB ID for movie: ${movie.name}`);
    } else {
      console.log(`No TMDB data found for movie: ${movie.name}`);
    }
  }
  
  // Close the database connection when done
  dataMapper.closeConnection();
}

updateMovieIds();