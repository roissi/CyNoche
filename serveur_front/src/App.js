// Importing necessary packages and components
import React, { Suspense, lazy, useEffect, useState } from 'react'; // Core package for building user interfaces using React
import { Box, Heading, Flex, Image, Link as ChakraLink, VStack, Grid} from '@chakra-ui/react'; // Chakra UI components for building UI
import { ChakraProvider, ColorModeScript, useColorModeValue } from "@chakra-ui/react" // Provider for Chakra UI and a hook to get the color mode value
import theme from "./theme" // The theme file for the Chakra UI
import { BrowserRouter as Router, Route, Link as RouterLink, Routes } from 'react-router-dom'; // React Router components for routing
import darkLogo from './assets/img/CyNoche-transparent.png'; // The dark logo for the application
import lightLogo from './assets/img/CyNoche-transparent_light.png'; // The light logo for the application
import ColorModeToggle from './component/ColorModeToggle'; // The ColorModeToggle component to toggle between dark and light modes
import { MovieProvider } from './contexts/MovieContext'; // The MovieProvider component from the Movie context that provides state for the movie
import { fetchThumbnailsFromDatabase, fetchMovieDetailsFromTMDB } from './contexts/MovieService'; // These are two functions imported from the MovieService.js file which is located in the contexts directory. fetchThumbnailsFromDatabase is used to get movie thumbnails from the database, and fetchMovieDetailsFromTMDB to fetch specific movie details from The Movie Database (TMDB) API.

// Use React.lazy to dynamically import the movies pages
const MoviesPage = lazy(() => import('./component/MoviesPage')); // The MoviesPage component to show all movies
const OneMoviePage = lazy(() => import('./component/OneMoviePage')); // The OneMoviePage component to show a single movie details

// The Home component for the home page of my application
const Home = () => {
  const [movies, setMovies] = useState([]); // To store 2023 movies

  useEffect(() => {
    let isMounted = true; // Track whether component is mounted

    const fetchMovies = async () => {
      try {
        const allMovies = await fetchThumbnailsFromDatabase();
        console.log(allMovies[0]); // Log the movies to the console

        // Filter the movies to only include those from 2023
        const movies2023 = allMovies.filter(movie => movie.year === 2023);
        const updatedMovies2023 = [];

        // Fetch additional details including images for each movie from TMDB
        // Process movies in batches to avoid overwhelming heap
        for (let i = 0; i < movies2023.length; i++) {
          try {
            const movieDetails = await fetchMovieDetailsFromTMDB(movies2023[i].id);
            updatedMovies2023.push({ ...movies2023[i], ...movieDetails });
          } catch (error) {
            console.error(`Failed to fetch details for movie ${movies2023[i].id}:`, error);
          }
        }

        if (isMounted) {
          // Set the state to the updated movies from 2023
          setMovies(updatedMovies2023);

          // Log the updated state
          console.log(updatedMovies2023);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();

    // Clean up function
    return () => {
      isMounted = false;
      setMovies([]); // Clear movie data when component unmounts
    };
  }, []);

  // Using Chakra UI color mode hook to get the color values based on the current color mode
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("white", "black");
  const linkColor = useColorModeValue('#319593', '#79e3d6');
  const linkColor2 = useColorModeValue('goldenrod', 'goldenrod');
  const hoverColor = useColorModeValue('gray.800', 'white');
  const logo = useColorModeValue(lightLogo, darkLogo);

  // Returning the JSX for the home page
  return (
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" justifyContent="space-between" alignItems="center">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Flex position="absolute" top={5} right={5}>
          <ColorModeToggle />
        </Flex>
        <VStack spacing={{ base: 2, md: 8 }} mt={['-6', '20']}>
          <Heading mb={{ base: "0", md: "4" }}>
            <Image src={logo} alt="CyNoche Logo" width="1200px" height="300px"  objectFit="contain" />
          </Heading>
          <VStack spacing={3} mb={{ base: "40", sm: "0" }}>
            <Flex direction="row" wrap="wrap" justifyContent="center" alignItems="center" mb={5} px={50}>
              <Grid templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(10, 1fr)" }} gap={6}>
                {movies.map((movie) => (
                  <Box key={movie.id}> 
                    <Image src={movie.posterUrl} width="100%" boxShadow="dark-lg" />
                  </Box>
                ))}
              </Grid>
            </Flex>
            <ChakraLink as={RouterLink} to="/movies" fontSize={['2em', '1.5em']} color={linkColor} _hover={{ color: hoverColor }} textAlign="center">Click here to see all movies</ChakraLink>
            <ChakraLink as={RouterLink} isExternal to="https://github.com/roissi/CyNoche" fontSize={['1.5em', '1.5em']} color={linkColor2} _hover={{ color: hoverColor }} textAlign="center">Click here to see the GitHub repository</ChakraLink>
            <ChakraLink as={RouterLink} isExternal to="https://portfolio-roissi.vercel.app/" fontSize={['1.5em', '1.5em']} color={linkColor2} _hover={{ color: hoverColor }} textAlign="center">Click here to see my Portfolio</ChakraLink>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

// The main App component
function App() {
  return (
    // The ChakraProvider wraps the entire application and provides the Chakra UI context
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="dark" />
      <Box
        backgroundColor="black"
        color="white"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* The Router component from React Router that provides routing functionality */}
        <Router>
          {/* The MovieProvider component that provides movie state to the components */}
          <MovieProvider>
            {/* The Routes component where you specify my routes */}
            <Routes>
              {/* Each Route component represents a single route in my application */}
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MoviesPage />
                </Suspense>
              }/>
              <Route path="/movies/:id" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <OneMoviePage />
                </Suspense>
              }/>
              {/* If you need it, add other routes here */}
            </Routes>
          </MovieProvider>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;