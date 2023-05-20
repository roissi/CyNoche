const client = require("../service/dbClient");

const dataMapper = {
  // Récupérer tous les films et les trier par année décroissante
  async getAllMovies() {
    const sqlQuery = `SELECT * FROM movies ORDER BY year DESC;`;
    let result;
    try {
      const sqlResult = await client.query(sqlQuery);
      result = sqlResult.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return result;
  },

    // Affiche le nombre de films dans ma BDD
  async countMovies() {
    const query = `
      SELECT COUNT(*)
      FROM movies
    `;
  
    try {
      const result = await client.query(query);
      return result.rows[0].count;
    } catch (error) {
      throw new Error('Error counting movies: ' + error);
    }
  },

  // Récupérer le résultat d'uine recherche
  async searchMovies(searchQuery) {
    const query = {
      text: 'SELECT * FROM movies WHERE name ILIKE $1 OR director ILIKE $1',
      values: [`%${searchQuery}%`],
    };
  
    try {
      const searchResults = await client.query(query);
      return searchResults.rows.length > 0 ? searchResults.rows : [];
    } catch (error) {
      throw new Error('Error searching movies: ' + error);
    }
  },

  // Récupérer tous les films et les trier en fonction de l'option de tri spécifiée
  async getAllMoviesBySort(sort = "year_desc") {
    const sortOptions = {
      // Options de tri disponibles
      year_desc: { column: "year", direction: "DESC" },
      year_asc: { column: "year", direction: "ASC" },
      rating_desc: { column: "rating", direction: "DESC" },
      rating_asc: { column: "rating", direction: "ASC" },
      name_asc: { column: "name", direction: "ASC" },
      name_desc: { column: "name", direction: "DESC" },
      director_asc: { column: "director", direction: "ASC" },
      director_desc: { column: "director", direction: "DESC" },
    };

    const { column, direction } = sortOptions[sort] || sortOptions.year_desc;
    const query = `SELECT * FROM movies ORDER BY ${column} ${direction};`;

    try {
      const { rows } = await client.query(query);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Récupérer un film spécifique par son ID
  async getMovieById(movieId) {
    const sqlQuery = `SELECT * FROM movies WHERE id = $1;`;
    let result;
    try {
      const sqlResult = await client.query(sqlQuery, [movieId]);
      result = sqlResult.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
    return result;
  },

  // Supprimer un film spécifique par son ID
  async deleteMovie(movieId) {
    try {
      const result = await client.query(`DELETE FROM movies WHERE id = $1;`, [
        movieId,
      ]);
      return result.rowCount;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Créer un nouveau film
  async createMovie(newMovie) {
    try {
      const result = await client.query(
        `
              INSERT INTO movies (date, name, director, year, rating, letterboxd_url) 
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING *
              `,
        [
          newMovie.date,
          newMovie.name,
          newMovie.director,
          newMovie.year,
          newMovie.rating,
          newMovie.letterboxd_url,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Mettre à jour un film existant
  async updateMovie(movieId, movieData) {
    try {
      const result = await client.query(
        `
      UPDATE movies
      SET name = $1,
      director = $2,
      year = $3,
      letterboxd_url = $4,
      rating = $5
      WHERE id = $6
      RETURNING *;
    `,
        [
          movieData.name,
          movieData.director,
          movieData.year,
          movieData.letterboxd_url,
          movieData.rating,
          movieId,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = dataMapper;
