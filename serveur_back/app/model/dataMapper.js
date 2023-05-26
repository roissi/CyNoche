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
              INSERT INTO movies (date, name, director, year, rating, letterboxd_url, tmdb_id, overview_en, overview_fr) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              RETURNING *
              `,
        [
          newMovie.date,
          newMovie.name,
          newMovie.director,
          newMovie.year,
          newMovie.rating,
          newMovie.letterboxd_url,
          newMovie.tmdb_id,
          newMovie.overview_en,
          newMovie.overview_fr
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
      const columns = ['name', 'director', 'year', 'letterboxd_url', 'rating', 'tmdb_id', 'overview_en', 'overview_fr'];
      const values = [movieData.name, movieData.director, movieData.year, movieData.letterboxd_url, movieData.rating, movieData.tmdb_id, movieData.overview_en, movieData.overview_fr];
  
      // Supprimer les colonnes qui n'ont pas de valeur correspondante dans movieData
      for (let i = 0; i < columns.length; i++) {
        if (values[i] === null || values[i] === undefined) {
          columns.splice(i, 1);
          values.splice(i, 1);
          i--;
        }
      }
  
      values.push(movieId); // Ajouter movieId à la fin du tableau de valeurs
  
      const query = `
        UPDATE movies
        SET ${columns.map((column, i) => `${column} = $${i+1}`).join(', ')}
        WHERE id = $${values.length}
        RETURNING *;
      `;
  
      try {
        const result = await client.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  
  // Ferme la connexion à la base de données
  async closeConnection() {
    try {
      await client.end();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = dataMapper;
