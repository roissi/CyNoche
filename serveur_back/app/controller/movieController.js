const dataMapper = require("../model/dataMapper");

const movieController = {
  // Route pour récupérer tous les films
  async getAllMovies(req, res, next) {
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
  async searchMovies(req, res, next) {
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
  async getAllMoviesBySort(req, res, next) {
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
  async getMovieById(req, res, next) {
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
  async deleteMovie(req, res, next) {
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
  async createMovie(req, res, next) {
    const { name, director, year, rating, letterboxd_url } = req.body;
    const date = new Date();
    const movieAdd = {
      date,
      name,
      director,
      year,
      rating,
      letterboxd_url,
    };

    try {
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
  async updateMovie(req, res, next) {
    const movieId = req.params.id;
    const movieData = req.body;

    try {
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

module.exports = movieController;