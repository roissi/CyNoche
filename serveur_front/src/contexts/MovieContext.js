// Import createContext and useContext from React
// createContext allows you to create a new Context object
// useContext allows you to access the current context value for a React context
import { createContext, useContext, useState } from 'react';

// Create a new context object
const MovieContext = createContext();

// This is a custom hook that will be used to access the context object's value
// It simplifies the process of importing the context and using useContext
export function useMovies() {
  return useContext(MovieContext);
}

// This is a context provider component
// It takes the children props and returns them wrapped inside the Context Provider
export const MovieProvider = ({ children }) => {
  // Create state variables that are used throughout the application
  // The use of context allows for state to be shared across different components
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('year_desc');

  // Create the value object that holds the state variables and their updater functions
  // This value will be passed to the provider and will be accessible to all components that use the context
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

  // Return the provider component with the value object
  // The children prop will be any components that this provider component wraps around in the component tree
  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}