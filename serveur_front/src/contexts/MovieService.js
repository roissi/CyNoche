import axios from 'axios';

export const fetchMovie = async (id) => {
  const response = await axios.get(`http://localhost:4500/movies/${id}`);
  const movie = response.data.movie;

  const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
  const movieData = tmdbResponse.data;
  const posterUrl = movieData.poster_path ? `https://image.tmdb.org/t/p/original${movieData.poster_path}` : null;
  movieData.posterUrl = posterUrl;

  console.log('TMDB movie details:', movieData);

  return { movie, movieData };
};