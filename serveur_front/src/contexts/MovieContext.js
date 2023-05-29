import { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export function useMovies() {
  return useContext(MovieContext);
}

export const MovieProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('year_desc');

  const value = {
    allMovies,
    setAllMovies,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    sort,
    setSort,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}