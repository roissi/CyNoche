// Import the database client
import client from "../service/dbClient.js";

const dataMapper = {
  // Fetch all movies from the database and sort them by year in descending order
  getAllMovies: async () => {
    const sqlQuery = `SELECT * FROM movies ORDER BY year DESC;`;
    let result;
    try {
      // Execute the query using the database client
      const sqlResult = await client.query(sqlQuery);
      // Store the rows returned by the query
      result = sqlResult.rows;
    } catch (error) {
      console.error(error);
      // Throw any error to be handled further up the call stack
      throw error;
    }
    return result;
  },

  // Get the count of all movies in the database
  countMovies: async () => {
    const query = `
      SELECT COUNT(*)
      FROM movies
    `;

    try {
      const result = await client.query(query);
      // Return the count
      return result.rows[0].count;
    } catch (error) {
      throw new Error('Error counting movies: ' + error);
    }
  },

  // Fetch the result of a movie search
  searchMovies: async (searchQuery) => {
    const query = {
      text: 'SELECT * FROM movies WHERE name ILIKE $1 OR director ILIKE $1',
      values: [`%${searchQuery}%`],
    };

    try {
      const searchResults = await client.query(query);
      // Return the search results, or an empty array if there are no results
      return searchResults.rows.length > 0 ? searchResults.rows : [];
    } catch (error) {
      throw new Error('Error searching movies: ' + error);
    }
  },

  // Fetch all movies and sort them according to the specified sort option
  getAllMoviesBySort: async (sort = "year_desc") => {
    // Define the available sort options
    const sortOptions = {
      year_desc: { column: "year", direction: "DESC" },
      year_asc: { column: "year", direction: "ASC" },
      rating_desc: { column: "rating", direction: "DESC" },
      rating_asc: { column: "rating", direction: "ASC" },
      name_asc: { column: "name", direction: "ASC" },
      name_desc: { column: "name", direction: "DESC" },
      director_asc: { column: "director", direction: "ASC" },
      director_desc: { column: "director", direction: "DESC" },
    };

    // Retrieve the column and direction for the sort option
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

  // Fetch a specific movie by its ID
  getMovieById: async (movieId) => {
    const sqlQuery = `SELECT * FROM movies WHERE id = $1;`;
    let result;
    try {
      const sqlResult = await client.query(sqlQuery, [movieId]);
      // Store the row returned by the query
      result = sqlResult.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
    return result;
  },

  // Delete a specific movie by its ID
  deleteMovie: async (movieId) => {
    try {
      const result = await client.query(`DELETE FROM movies WHERE id = $1;`, [
        movieId,
      ]);
      // Return the number of rows affected by the DELETE query
      return result.rowCount;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Create a new movie
  createMovie: async (newMovie) => {
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
      // Return the row representing the newly created movie
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update an existing movie
  updateMovie: async (movieId, movieData) => {
    const columns = ['name', 'director', 'year', 'letterboxd_url', 'rating', 'tmdb_id', 'overview_en', 'overview_fr'];
    const values = [movieData.name, movieData.director, movieData.year, movieData.letterboxd_url, movieData.rating, movieData.tmdb_id, movieData.overview_en, movieData.overview_fr];

    // Remove any columns that do not have a corresponding value in movieData
    for (let i = 0; i < columns.length; i++) {
      if (values[i] === null || values[i] === undefined) {
        columns.splice(i, 1);
        values.splice(i, 1);
        i--;
      }
    }

    // Add movieId to the end of the values array
    values.push(movieId); 

    // Construct the query for updating the movie
    const query = `
      UPDATE movies
      SET ${columns.map((column, i) => `${column} = $${i+1}`).join(', ')}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    try {
      const result = await client.query(query, values);
      // Return the row representing the updated movie
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Close the connection to the database
  closeConnection: async () => {
    try {
      await client.end();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the dataMapper object
export default dataMapper;