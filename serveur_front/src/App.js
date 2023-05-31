// Importing necessary packages and components
import React from 'react'; // Core package for building user interfaces using React
import { Box, Heading, Flex, Image, Link as ChakraLink, VStack } from '@chakra-ui/react'; // Chakra UI components for building UI
import { ChakraProvider, useColorModeValue } from "@chakra-ui/react" // Provider for Chakra UI and a hook to get the color mode value
import theme from "./theme" // The theme file for the Chakra UI
import { BrowserRouter as Router, Route, Link as RouterLink, Routes } from 'react-router-dom'; // React Router components for routing
import darkLogo from './assets/img/CyNoche-transparent.png'; // The dark logo for the application
import lightLogo from './assets/img/CyNoche-transparent_light.png'; // The light logo for the application
import MoviesPage from './component/MoviesPage'; // The MoviesPage component to show all movies
import OneMoviePage from './component/OneMoviePage'; // The OneMoviePage component to show a single movie details
import ColorModeToggle from './component/ColorModeToggle'; // The ColorModeToggle component to toggle between dark and light modes
import { MovieProvider } from './contexts/MovieContext'; // The MovieProvider component from the Movie context that provides state for the movie

// The Home component for the home page of my application
const Home = () => {
  // Using Chakra UI color mode hook to get the color values based on the current color mode
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("white", "black");
  const linkColor = useColorModeValue('#319593', '#79e3d6');
  const linkColor2 = useColorModeValue('goldenrod', 'goldenrod');
  const hoverColor = useColorModeValue('gray.800', 'white');
  const logo = useColorModeValue(lightLogo, darkLogo);

  // Returning the JSX for the home page
  return (
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" justifyContent="center" alignItems="center">
      <Flex position="absolute" top={5} right={5}>
        <ColorModeToggle />
      </Flex>
      <VStack spacing={8}>
        <Heading>
          <Image src={logo} alt="CyNoche Logo" width="1200px" height="300px"  objectFit="contain" />
        </Heading>
        <VStack spacing={3}>
          <ChakraLink as={RouterLink} to="/movies" fontSize="1.5em" color={linkColor} _hover={{ color: hoverColor }}>Click here to see all movies</ChakraLink>
          <ChakraLink as={RouterLink} isExternal to="https://github.com/roissi/CyNoche" fontSize="1.5em" color={linkColor2} _hover={{ color: hoverColor }}>Click here to see the GitHub repository</ChakraLink>
          <ChakraLink as={RouterLink} isExternal to="https://github.com/roissi/CyNoche/blob/master/README.md" fontSize="1.5em" color={linkColor2} _hover={{ color: hoverColor }}>Click here to README.md</ChakraLink>
        </VStack>
      </VStack>
    </Flex>
  );
};

// The main App component
function App() {
  return (
    // The ChakraProvider wraps the entire application and provides the Chakra UI context
    <ChakraProvider theme={theme}>
      {/* The main layout for the app */}
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
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:id" element={<OneMoviePage />} />
              {/* If you need it, add other routes here */}
            </Routes>
          </MovieProvider>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;