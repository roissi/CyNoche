import axios from 'axios';

// Fetch movies from the backend
export const fetchMovies = (endpoint) => {
  return axios.get(endpoint)
    .then(res => {
      return {
        movies: res.data.movies,
        count: res.data.count,
        error: null
      }
    })
    .catch(err => {
      return {
        movies: [],
        count: 0,
        error: err.message
      }
    });
};

// Function to sort movies
export const sortMovies = (movies, sort) => {
  if (!movies) {
    return [];
  }
  const sortedMovies = [...movies];
  switch (sort) {
  case 'name_asc':
    sortedMovies.sort((a, b) => a.name.localeCompare(b.name));
    break;
  case 'name_desc':
    sortedMovies.sort((a, b) => b.name.localeCompare(a.name));
    break;
  case 'year_asc':
    sortedMovies.sort((a, b) => a.year - b.year);
    break;
  case 'year_desc':
    sortedMovies.sort((a, b) => b.year - a.year);
    break;
  case 'director_asc':
    sortedMovies.sort((a, b) => a.director.localeCompare(b.director));
    break;
  case 'director_desc':
    sortedMovies.sort((a, b) => b.director.localeCompare(a.director));
    break;
  case 'rating_asc':
    sortedMovies.sort((a, b) => a.rating - b.rating);
    break;
  case 'rating_desc':
    sortedMovies.sort((a, b) => b.rating - a.rating);
    break;
  default:
    throw new Error(`Invalid sort option: ${sort}`);
  }
    
  return sortedMovies;
};