import React from 'react';
import { Box, Heading, Flex,Link as ChakraLink, VStack } from '@chakra-ui/react';
import { ChakraProvider, useColorModeValue } from "@chakra-ui/react"
import theme from "./theme"
import { BrowserRouter as Router, Route, Link as RouterLink, Routes } from 'react-router-dom';
import MoviesPage from './component/MoviesPage';
import OneMoviePage from './component/OneMoviePage';
import ColorModeToggle from './component/ColorModeToggle';

const Home = () => {
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("white", "black");
  const titleColor = useColorModeValue('black', 'white');
  const linkColor = useColorModeValue('#319593', '#79e3d6');
  const hoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" justifyContent="center" alignItems="center">
      <Flex position="absolute" top={5} right={5}>
        <ColorModeToggle />
      </Flex>
      <VStack spacing={8}>
        <Heading as="h1" fontSize="5em" fontFamily="'Mulish', sans-serif" color={titleColor}>CyNoche</Heading>
        <VStack spacing={4}>
          <ChakraLink as={RouterLink} to="/movies" color={linkColor} _hover={{ color: hoverColor }}>Click here to see all movies</ChakraLink>
          <ChakraLink as={RouterLink} to="/directors" color={linkColor} _hover={{ color: hoverColor }}>Click here to see all directors</ChakraLink>
          <ChakraLink as={RouterLink} to="/ratings" color={linkColor} _hover={{ color: hoverColor }}>Click here to see all ratings</ChakraLink>
        </VStack>
      </VStack>
    </Flex>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        backgroundColor="black"
        color="white"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id" element={<OneMoviePage />} />
            {/* Ajoutez vos autres routes ici */}
            {/* <Route path="/directors" element={<DirectorsPage />} /> */}
            {/* <Route path="/ratings" element={<RatingsPage />} /> */}
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;