import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Stack, VStack, Heading, Image, Input, Text, List, Spinner } from '@chakra-ui/react';
import darkLogo from '../assets/img/CyNoche-transparent.png';
import lightLogo from '../assets/img/CyNoche-transparent_light.png';
import ColorModeToggle from './ColorModeToggle';
import { useColorModeValue } from '@chakra-ui/react';
import MovieListItem from './MovieListItem';
import AddModal from './ModalAddMovie';
import SortButtons from './SortButtons';
import { useMovies } from '../contexts/MovieContext';
import { fetchMovies, sortMovies } from '../contexts/MovieUtils';  // Importez les nouvelles fonctions ici

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

  const [counter, setCounter] = useState(0);
  const animationTime = 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < movieCount) {
          return prevCounter + 1;
        }

        clearInterval(intervalId);

        return prevCounter;
      });
    }, animationTime / movieCount);

    return () => clearInterval(intervalId);
  }, [movieCount]);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_API_BASE_URL}/movies`;
    fetchMovies(endpoint)
      .then(res => {
        setAllMovies(res.movies);
        setMovieCount(res.count);
        setError(res.error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const sortedMovies = sortMovies(allMovies, sort);
    const start = (currentPage - 1) * MOVIES_PER_PAGE;
    const end = start + MOVIES_PER_PAGE;
    setDisplayedMovies(sortedMovies.slice(start, end));
  }, [allMovies, sort, currentPage]);

  const searchMovies = () => {
    const endpoint = `${process.env.REACT_APP_API_BASE_URL}/movies/search?query=${encodeURIComponent(searchQuery)}`;

    if (!searchPerformed) {
      setMoviesBeforeSearch(allMovies);
      setPageBeforeSearch(currentPage);
    }
  
    fetchMovies(endpoint)
      .then(res => {
        setAllMovies(res.movies);
        setMovieCount(res.count);
        setError(res.error);
        setIsLoading(false);
      });
    setSearchPerformed(true);
  };

  // JSX returned by the component
  return (
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" pl={{ base: "4", md: "100" }} pr={{ base: "4", md: "100" }} justifyContent="space-between">
      <Flex position="absolute" top={5} right={5}>
        <ColorModeToggle />
      </Flex>
      <VStack spacing={3} w="100%" alignItems="center" mt={['-6', '20']}>
        <Heading>
          <Link to="/">
            <Image src={logo} alt="CyNoche Logo" width={{ base: "300px", md: "600px" }} height="300px"  objectFit="contain" />
          </Link>
        </Heading>
        <Box display={{ base: 'none', sm: 'flex' }}>
          <SortButtons setSort={setSort} />
        </Box>

        <Box mb={5}>
          <Heading as="h2" mb="3">{searchPerformed ? "Search again ?" : "Come on, search..."}</Heading>
          <form onSubmit={e => {
            e.preventDefault();
            setPageBeforeSearch(currentPage); // Saving the current page before searching
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
                  w={{ base: "200px", md: "250px" }}
                />
                <Button colorScheme='teal' size='md' ml="4" type='submit'>Search</Button>
                {searchPerformed && (
                  <Button colorScheme='teal' size='md' ml="4" onClick={() => {
                    setAllMovies(moviesBeforeSearch);
                    setCurrentPage(pageBeforeSearch); // Restoring the page before the search
                    setSearchPerformed(false);
                  }}>Back to list</Button>
                )}
              </Flex>
            </Flex>
          </form>
        </Box>
        <Box height="30px" />

        <Flex direction={{ base: "column", md: "row" }} justify="center" align="flex-start" w="100%">
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
                      <Text color="goldenrod" fontStyle="italic">So sorry... No movie found. Did you spell the title of the film or the name of the director correctly?</Text>
                    )}
                  </List>
                </>
              )}
            </div>
          </Box>

          {!searchPerformed && (
            <Box ml={{ base: 0, md: 5 }} mt={{ base: 5, md: 0 }}>
              <AddModal />
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