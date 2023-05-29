import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Stack, VStack, Heading, Image, Input, Text, List, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import darkLogo from '../assets/img/CyNoche-transparent.png';
import lightLogo from '../assets/img/CyNoche-transparent_light.png';
import ColorModeToggle from './ColorModeToggle';
import { useColorModeValue } from '@chakra-ui/react';
import MovieListItem from './MovieListItem';
import AddModal from './ModalAddMovie';
import SortButtons from './SortButtons';
import { useMovies } from '../contexts/MovieContext';

const MOVIES_PER_PAGE = 50;
  
const MoviesPage = () => {
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("black", "white");
  const logo = useColorModeValue(lightLogo, darkLogo);
  const { allMovies, setAllMovies, currentPage, setCurrentPage, searchQuery, setSearchQuery, sort, setSort } = useMovies();

  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [movieCount, setMovieCount] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [moviesBeforeSearch, setMoviesBeforeSearch] = useState([]);
  const [pageBeforeSearch, setPageBeforeSearch] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Counter logic for movie count animation
  const [counter, setCounter] = useState(0);
  const animationTime = 100; // in milliseconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < movieCount) {
          return prevCounter + 3;
        }

        clearInterval(intervalId);

        return prevCounter;
      });
    }, animationTime / movieCount);

    return () => clearInterval(intervalId);
  }, [movieCount]);
  
  // Fetch movies from the backend
  const fetchMovies = (endpoint) => {
    axios.get(endpoint)
      .then(res => {
        setAllMovies(res.data.movies);
        setMovieCount(res.data.count);
        setError(null); // reset error on successful request
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after the request is completed
      });
  };

  // Function to sort movies
  function sortMovies(movies, sort) {
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
  }
 
  // Update displayedMovies when allMovies, sort, or currentPage changes
  useEffect(() => {
    const sortedMovies = sortMovies(allMovies, sort);
    const start = (currentPage - 1) * MOVIES_PER_PAGE;
    const end = start + MOVIES_PER_PAGE;
    setDisplayedMovies(sortedMovies.slice(start, end));
  }, [allMovies, sort, currentPage]);

  // Load all movies without sorting when the component mounts
  useEffect(() => {
    const endpoint = `http://localhost:4500/movies`;
    fetchMovies(endpoint);
  }, []);
  
  // Search movies using fetchMovies0
  const searchMovies = () => {
    const endpoint = `http://localhost:4500/movies/search?query=${encodeURIComponent(searchQuery)}`;
    
    // Si aucune recherche n'a été effectuée précédemment, sauvegarder l'état actuel des films et la page
    if (!searchPerformed) {
      setMoviesBeforeSearch(allMovies);
      setPageBeforeSearch(currentPage);
    }
  
    fetchMovies(endpoint);
    setSearchPerformed(true);
  };

  return (
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" pl={100} pr={100} justifyContent="space-between">
      <Flex position="absolute" top={5} right={5}>
        <ColorModeToggle />
      </Flex>
      <VStack spacing={3} w="100%" alignItems="center">
        <Heading>
          <Image src={logo} alt="CyNoche Logo" width="600px" height="300px"  objectFit="contain" />
        </Heading>
        <SortButtons setSort={setSort} />

        <Box mb={5}>
          <Heading as="h2" mb="3">{searchPerformed ? "Search again ?" : "Come on, search..."}</Heading>
          <form onSubmit={e => {
            e.preventDefault();
            setPageBeforeSearch(currentPage); // Sauvegarde de la page courante avant la recherche
            searchMovies();
            setSearchPerformed(true);
          }}>
            <Flex direction="column" alignItems="center" justify="center">
              <Flex direction="row" justify="center" align="center">
                <Input 
                  type="text" 
                  placeholder="Movie title or Director name" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  borderColor="gray.400"
                  w="250px" 
                />
                <Button colorScheme='teal' size='md' ml="4" type='submit'>Search</Button>
                {searchPerformed && (
                  <Button colorScheme='teal' size='md' ml="4" onClick={() => {
                    setAllMovies(moviesBeforeSearch);
                    setCurrentPage(pageBeforeSearch); // Restauration de la page avant la recherche
                    setSearchPerformed(false);
                  }}>Back to list</Button>
                )}
              </Flex>
            </Flex>
          </form>
        </Box>
        <Box height="30px" />

        <Flex direction="row" justify="center" align="flex-start" w="100%">
          <Box>
            <Heading as="h2" mb={10}>
              <Text as="span" color="goldenrod">{counter}</Text>
              <Text as="span"> movies</Text>
            </Heading>
            <div>
              {isLoading ? (
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.800'
                  color='goldenrod'
                  size='xl' />
              ) : (
                <>
                  {error && <Text color="red">{`An error occurred: ${error}`}</Text>}
                  <List spacing={2}>
                    {Array.isArray(displayedMovies) && displayedMovies.length > 0 ? (
                      displayedMovies.map(movie => (
                        <MovieListItem key={movie.id} movie={movie} />
                      ))
                    ) : (
                      <Text color="goldenrod" fontStyle="italic">So sorry... No movie found. Did you spell the title of the   film or the name of the director correctly?</Text>)}
                  </List>
                </>
              )}
            </div>
          </Box>

          {!searchPerformed && (
            <Box ml={5}>
              <AddModal /> {/* Ajout du composant AddModal ici */}
            </Box>
          )}
        </Flex>
        <Box display="flex" flexDirection="column" alignItems="center" w="100%">
          {!searchPerformed && (
            <Stack mt={10} mb={10} spacing={4} direction='row'>
              <Button colorScheme='teal' size='md' onClick={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage === 1 || searchPerformed}>Previous
              </Button>
              <Button colorScheme='teal' size='md' onClick={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage === Math.ceil(movieCount / MOVIES_PER_PAGE) || searchPerformed}>Next
              </Button>
            </Stack>
          )}
          
          <Box mt={30} />
        </Box>
      </VStack>
    </Flex>
  );
};

export default MoviesPage;