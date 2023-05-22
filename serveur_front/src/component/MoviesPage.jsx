import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Stack, VStack, Heading, Image, Input, Text, List, ListItem, Link as ChakraLink } from '@chakra-ui/react';
import axios from 'axios';
import letterboxdLogo from '../assets/letterboxd-decal-dots-neg-rgb-500px.png';
import ColorModeToggle from './ColorModeToggle';
import { useColorModeValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddModal from './ModalAddMovie';
  
const MoviesPage = () => {
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("black", "white");
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 80;
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('year_desc');
  const [movieCount, setMovieCount] = useState(0);
  const titleColor = useColorModeValue('#319593', '#79e3d6');
  const hoverColor = useColorModeValue('black', 'white');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [moviesBeforeSearch, setMoviesBeforeSearch] = useState([]);
  const [pageBeforeSearch, setPageBeforeSearch] = useState(1);
  
  // Créer la fonction fetchMovies
  const fetchMovies = (endpoint) => {
    axios.get(endpoint)
      .then(res => {
        setAllMovies(res.data.movies);
        setMovieCount(res.data.count);
      })
      .catch(err => console.error(err));
  };
 
  // Charger tous les films sans tri au montage du composant
  useEffect(() => {
    const endpoint = `http://localhost:4500/movies`;
    fetchMovies(endpoint);
  }, []);

  // Mon compteur ici
  const [counter, setCounter] = useState(0);
  const animationTime = 100; // en millisecondes

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

  // Mettre à jour displayedMovies lorsque allMovies, sort, ou currentPage change
  useEffect(() => {
    const sortedMovies = sortMovies(allMovies, sort);
    const start = (currentPage - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    setDisplayedMovies(sortedMovies.slice(start, end));
  }, [allMovies, sort, currentPage]);

  // Fonction pour trier les films
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
  
  // La fonction searchMovies utilise maintenant fetchMovies
  const searchMovies = () => {
    const endpoint = `http://localhost:4500/movies/search?query=${encodeURIComponent(searchQuery)}`;
    setMoviesBeforeSearch(allMovies);
    setPageBeforeSearch(currentPage);
    fetchMovies(endpoint);
    setSearchPerformed(true);
  };

  // Les fonctions de tri mettent à jour maintenant l'état 'sort'
  const sortMoviesByNameAsc = () => setSort('name_asc');
  const sortMoviesByNameDesc = () => setSort('name_desc');
  const sortMoviesByYearAsc = () => setSort('year_asc');
  const sortMoviesByYearDesc = () => setSort('year_desc');
  const sortMoviesByDirecAsc = () => setSort('director_asc');
  const sortMoviesByDirecDesc = () => setSort('director_desc');
  const sortMoviesByRatingAsc = () => setSort('rating_asc');
  const sortMoviesByRatingDesc = () => setSort('rating_desc');

  return (
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" pl={100} pr={100} justifyContent="space-between">
      <Flex position="absolute" top={5} right={5}>
        <ColorModeToggle />
      </Flex>
      <VStack spacing={3} w="100%" alignItems="center">
        <Heading as="h1" fontSize="5em" fontFamily="'Shining-NFI-Demo'" textShadow="3px 3px teal" mt={10} mb={10}>Cy<Text as="span" fontSize="0.8em">Screen</Text></Heading>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Stack mb={4} spacing={4} direction='row' align='center'>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByNameAsc}>Name (A-Z)</Button>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByNameDesc}>Name (Z-A)</Button>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByYearAsc}>Year (old - new)</Button>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByYearDesc}>Year (new - old)</Button>
          </Stack>
          <Stack mb={10} spacing={4} direction='row' align='center'>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByDirecAsc}>Director (A-Z)</Button>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByDirecDesc}>Director (Z-A)</Button>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByRatingAsc}>Rating (0-5)</Button>
            <Button colorScheme='teal' size='md' onClick={sortMoviesByRatingDesc}>Rating (5-0)</Button>
          </Stack>
        </Box>
        <Flex direction="row" justify="center" align="flex-start" w="100%">
          <Box>
            <Heading as="h2" mb={10}>
              <Text as="span" color="goldenrod">{counter}</Text>
              <Text as="span"> movies</Text>
            </Heading>
            <div>
              <List spacing={2}>
                {Array.isArray(displayedMovies) && displayedMovies.length > 0
                  ? displayedMovies.map(movie => (
                    <ListItem key={movie.id}>
                      <Flex align="center">
                        <ChakraLink as={RouterLink} to={`/movies/${movie.id}`} color={titleColor} _hover={{ color: hoverColor }} fontStyle="italic" fontWeight="bold">
                          {movie.name}
                        </ChakraLink>
                        <Text as="span" mx={2}>-</Text>
                        {movie.director} ({movie.year})
                        <Box as="span" className="rating" ml="4">
                          {[...Array(5)].map((_, i) => {
                          // Si la note est supérieure à l'indice actuel, afficher une étoile pleine
                            if (movie.rating > i) {
                            // Si la note est un nombre à virgule flottante et si la partie décimale est au moins 0.5, afficher une étoile à moitié pleine
                              if (i === Math.floor(movie.rating) && movie.rating % 1 >= 0.5) {
                                return <FontAwesomeIcon key={i} icon={['fas', 'star-half-alt']} color="goldenrod" /> // étoile à moitié pleine
                              }

                              return <FontAwesomeIcon key={i} icon={['fas', 'star']} color="goldenrod" /> // étoile pleine
                            }

                            // Sinon, afficher une étoile vide
                            return <FontAwesomeIcon key={i} icon={['far', 'star']} color="#808080" /> // étoile vide
                          })}
                        </Box>
                        <ChakraLink href={movie.letterboxd_url} isExternal ml="2">
                          <Image src={letterboxdLogo} alt="Letterboxd Info" boxSize="24px" />
                        </ChakraLink>
                      </Flex>
                    </ListItem>
                  ))
                  : <Text color="goldenrod" fontStyle="italic">So sorry... No movie found. Did you spell the title of the film or the name of the director correctly?</Text>}
              </List>
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
              <Button colorScheme='teal' size='md' onClick={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage === Math.ceil(movieCount / moviesPerPage) || searchPerformed}>Next
              </Button>
            </Stack>
          )}
          <Heading as="h2" mb={3}>{searchPerformed ? "Search again ?" : "Come on, search..."}</Heading>
          <form onSubmit={e => {
            e.preventDefault();
            setPageBeforeSearch(currentPage); // Sauvegarde de la page courante avant la recherche
            searchMovies();
            setSearchPerformed(true);
          }}>
            <Box display="flex" justifyContent="center">
              <Input 
                type="text" 
                placeholder="Movie title or Director name" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                borderColor="gray.400"
                w="250px" 
              />
            </Box>
            <Stack direction='row' justify='center' spacing={4} mt={4}>
              <Button colorScheme='teal' size='md' type='submit'>Search</Button>
              {searchPerformed && (
                <Button colorScheme='teal' size='md' onClick={() => {
                  setAllMovies(moviesBeforeSearch);
                  setCurrentPage(pageBeforeSearch); // Restauration de la page avant la recherche
                  setSearchPerformed(false);
                }}>Back to list</Button>
              )}
            </Stack>
          </form>
          <Box mt={30} />
        </Box>
      </VStack>
    </Flex>
  );
};

export default MoviesPage;