const dataMapper = require("./app/model/dataMapper"); // chemin vers votre fichier dataMapper
const axios = require("axios");
require('dotenv').config();

async function getTmdbDataForMovie(movie, type = 'movie') {
  try {
    const cleanedMovieName = movie.name
      .normalize('NFD') // décompose les caractères accentués en leur forme de base et leur accent
      .replace(/æ/g, 'ae') // remplace 'æ' par 'ae'
      .replace(/œ/g, 'oe') // remplace 'œ' par 'oe'
      .replace(/[\u0300-\u036f]/g, '') // supprime tous les signes diacritiques
      .toLowerCase()
      .replace(/^(le|la|les|un|une|des)\s+/i, '') // supprime les articles définis et indéfinis en français
      .replace(/[-:][^]+$/, '') // supprime tout après ':' ou '-'
      .replace(/[^\w\s]/g, '') // supprime la ponctuation
      .replace(/\s+/g, ' '); // remplace plusieurs espaces par un seul espace

    let responseEn = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
        cleanedMovieName
      )}&year=${movie.year}&language=en`
    );

    if (!responseEn.data.results || responseEn.data.results.length === 0) {
      responseEn = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
          cleanedMovieName
        )}&year=${movie.year}&language=en`
      );
    }

    let responseFr = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
        cleanedMovieName
      )}&year=${movie.year}&language=fr`
    );

    if (!responseFr.data.results || responseFr.data.results.length === 0) {
      responseFr = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
          cleanedMovieName
        )}&year=${movie.year}&language=fr`
      );
    }

    const tmdbDataEn = responseEn.data.results[0];
    const tmdbDataFr = responseFr.data.results[0];

    if (!tmdbDataEn || !tmdbDataFr) {
      console.log(`No TMDB data found for movie: ${movie.name}`);
      return null;
    }

    return {
      id: tmdbDataEn.id,
      details_en: tmdbDataEn.overview,
      details_fr: tmdbDataFr.overview
    };
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
    const tmdbData = await getTmdbDataForMovie(movie);

    if (tmdbData) {
      // Mettre à jour l'ID du film et les détails dans la base de données
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

updateMovieIds();