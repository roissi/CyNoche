// Import the necessary packages and modules
import dataMapper from "../model/dataMapper.js";
import axios from 'axios';

const movieController = {
  // Route handler to get all movies
  getAllMovies: async (req, res, next) => {
    try {
      // Fetch all movies from the database
      const movies = await dataMapper.getAllMovies();

      // Count the number of movies
      const movieCount = await dataMapper.countMovies();

      // Send response with count of movies and the movies themselves
      res.json({ count: movieCount, movies });
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  },

  // Route handler to search for movies based on a search query
  searchMovies: async (req, res, next) => {
    const searchQuery = req.query.query;
    try {
      const searchResults = await dataMapper.searchMovies(searchQuery);

      // If no movie is found, send a message to the user
      if (searchResults.length === 0) {
        res.json({ message: 'So sorry... No movie found. Did you spell the name of the film or the name of the director correctly?' });
      } else {
        res.json({ movies: searchResults });
      }
    } catch (error) {
      next(error);
    }
  },

  // Route handler to get all movies based on the requested sort
  getAllMoviesBySort: async (req, res, next) => {
    const sort = req.query.sort;

    try {
      // Fetch all movies from the database sorted by the requested parameter
      const movies = await dataMapper.getAllMoviesBySort(sort);
      res.json({ movies });
    } catch (error) {
      next(error);
    }
  },

  // Route handler to get a specific movie by its ID
  getMovieById: async (req, res, next) => {
    const movieId = req.params.id;

    try {
      const movie = await dataMapper.getMovieById(movieId);

      // If the movie is not found, send a message to the user
      if (!movie) {
        res.status(404).json({ message: "Film introuvable" });
        return;
      }

      res.json({ movie });
    } catch (error) {
      next(error);
    }
  },

  // Route handler to delete a movie
  deleteMovie: async (req, res, next) => {
    const movieId = req.params.id;

    try {
      const deletedRowCount = await dataMapper.deleteMovie(movieId);

      // If no movie was deleted, send a message to the user
      if (deletedRowCount === 0) {
        res.status(404).json({ message: "Film introuvable" });
        return;
      }

      res.json({ message: `Film supprimé avec l'ID: ${movieId}` });
    } catch (error) {
      next(error);
    }
  },

  // Route handler to create a new movie
  createMovie: async (req, res, next) => {
    const { name, director, year, rating, letterboxd_url } = req.body;
    const date = new Date();

    try {
      // Fetch TMDB ID for the movie
      const tmdbResponseEn = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${name}`);
      const tmdbResponseFr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=1&include_adult=false&query=${name}`);

      // Utilizing optional chaining to avoid an error if no result is found
      const tmdb_id = tmdbResponseEn.data.results[0]?.id;
      const overview_en = tmdbResponseEn.data.results[0]?.overview;
      const overview_fr = tmdbResponseFr.data.results[0]?.overview;

      const movieAdd = {
        date,
        name,
        director,
        year,
        rating,
        letterboxd_url,
        tmdb_id, // Add the TMDB ID to your movie data
        overview_en,
        overview_fr
      };

      const movie = await dataMapper.createMovie(movieAdd);

      // If the movie is not created, send a message to the user
      if (!movie) {
        res.status(404).json({ message: "Impossible de créer le film" });
        return;
      }

      res.json({ message: 'Film créé avec succès', movie });
    } catch (error) {
      next(error);
    }
  },

  // Route handler to update an existing movie
  updateMovie: async (req, res, next) => {
    const movieId = req.params.id;
    const { name, director, year, rating, letterboxd_url } = req.body;

    try {
      // Fetch TMDB ID for the movie
      const tmdbResponseEn = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${name}`);
      const tmdbResponseFr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=1&include_adult=false&query=${name}`);

      // Utilizing optional chaining to avoid an error if no result is found
      const tmdb_id = tmdbResponseEn.data.results[0]?.id;
      const overview_en = tmdbResponseEn.data.results[0]?.overview;
      const overview_fr = tmdbResponseFr.data.results[0]?.overview;

      const movieData = {
        name,
        director,
        year,
        rating,
        letterboxd_url,
        tmdb_id, // Update the TMDB ID in your movie data
        overview_en,
        overview_fr
      };

      const movie = await dataMapper.updateMovie(movieId, movieData);

      // If the movie is not found, send a message to the user
      if (!movie) {
        res.status(404).json({ message: "Film introuvable" });
        return;
      }

      res.json({ message: 'Film mis à jour avec succès', movie });
    } catch (error) {
      next(error);
    }
  },
};

export default movieController;