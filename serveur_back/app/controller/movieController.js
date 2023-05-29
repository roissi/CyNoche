import dataMapper from "../model/dataMapper.js";
import axios from 'axios';

const movieController = {
  // Route pour récupérer tous les films
  getAllMovies: async (req, res, next) => {
    try {
      const movies = await dataMapper.getAllMovies();
      const movieCount = await dataMapper.countMovies();
      res.json({ count: movieCount, movies });
    } catch (error) {
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  },

  // Route pour rechercher des films en fonction d'une requête de recherche
  searchMovies: async (req, res, next) => {
    const searchQuery = req.query.query;

    try {
      const searchResults = await dataMapper.searchMovies(searchQuery);
      if (searchResults.length === 0) {
        // Vous pouvez utiliser res.send pour renvoyer une simple chaîne de caractères
        res.json({ message: 'So sorry... No movie found. Did you spell the name of the film or the name of the director correctly?' });
      } else {
        res.json({ movies: searchResults });
      }
    } catch (error) {
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  },

  // Route pour récupérer les films en fonction du tri demandé
  getAllMoviesBySort: async (req, res, next) => {
    const sort = req.query.sort;
    try {
      const movies = await dataMapper.getAllMoviesBySort(sort);
      res.json({ movies });
    } catch (error) {
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  },

  // Route pour récupérer un film spécifique par son ID
  getMovieById: async (req, res, next) => {
    const movieId = req.params.id;
    try {
      const movie = await dataMapper.getMovieById(movieId);
      if (!movie) {
        res.status(404).json({ message: "Film introuvable" });
        return;
      }
      res.json({ movie });
    } catch (error) {
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  },

  // Route pour supprimer un film
  deleteMovie: async (req, res, next) => {
    const movieId = req.params.id;
    try {
      const deletedRowCount = await dataMapper.deleteMovie(movieId);
      if (deletedRowCount === 0) {
        res.status(404).json({ message: "Film introuvable" });
        return;
      }
      res.json({ message: `Film supprimé avec l'ID: ${movieId}` });
    } catch (error) {
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  },

  // Route pour créer un nouveau film
  createMovie: async (req, res, next) => {
    const { name, director, year, rating, letterboxd_url } = req.body;
    const date = new Date();

    try {
      // Fetch TMDB ID for the movie
      const tmdbResponseEn = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${name}`);
      const tmdbResponseFr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=1&include_adult=false&query=${name}`);

      const tmdb_id = tmdbResponseEn.data.results[0]?.id; // Utilisation de la chaîne d'accès optionnelle pour éviter une erreur si aucun résultat n'est trouvé
      const overview_en = tmdbResponseEn.data.results[0]?.overview;
      const overview_fr = tmdbResponseFr.data.results[0]?.overview;

      const movieAdd = {
        date,
        name,
        director,
        year,
        rating,
        letterboxd_url,
        tmdb_id, // Ajouter l'ID TMDB à vos données de film
        overview_en,
        overview_fr
      };

      const movie = await dataMapper.createMovie(movieAdd);
      if (!movie) {
        res.status(404).json({ message: "Impossible de créer le film" });
        return;
      }
      res.json({ message: 'Film créé avec succès', movie });
    } catch (error) {
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  },

  // Route pour mettre à jour un film existant
  updateMovie: async (req, res, next) => {
    const movieId = req.params.id;
    const { name, director, year, rating, letterboxd_url } = req.body;

    try {
      // Fetch TMDB ID for the movie
      const tmdbResponseEn = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${name}`);
      const tmdbResponseFr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=1&include_adult=false&query=${name}`);

      const tmdb_id = tmdbResponseEn.data.results[0]?.id; // Utilisation de la chaîne d'accès optionnelle pour éviter une erreur si aucun résultat n'est trouvé
      const overview_en = tmdbResponseEn.data.results[0]?.overview;
      const overview_fr = tmdbResponseFr.data.results[0]?.overview;

      const movieData = {
        name,
        director,
        year,
        rating,
        letterboxd_url,
        tmdb_id, // Mettre à jour l'ID TMDB dans vos données de film
        overview_en,
        overview_fr
      };

      const movie = await dataMapper.updateMovie(movieId, movieData);
      if (!movie) {
        res.status(404).json({ message: "Film introuvable" });
        return;
      }
      res.json({ message: 'Film mis à jour avec succès', movie });
    } catch (error) {
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  },
};

export default movieController;