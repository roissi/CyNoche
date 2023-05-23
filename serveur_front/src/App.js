import React from 'react';
import { Box, Heading, Flex, Image, Link as ChakraLink, VStack } from '@chakra-ui/react';
import { ChakraProvider, useColorModeValue } from "@chakra-ui/react"
import theme from "./theme"
import { BrowserRouter as Router, Route, Link as RouterLink, Routes } from 'react-router-dom';
import darkLogo from './assets/img/CyNoche-transparent.png';
import lightLogo from './assets/img/CyNoche-transparent_light.png';
import MoviesPage from './component/MoviesPage';
import OneMoviePage from './component/OneMoviePage';
import ColorModeToggle from './component/ColorModeToggle';

const Home = () => {
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("white", "black");
  const linkColor = useColorModeValue('#319593', '#79e3d6');
  const linkColor2 = useColorModeValue('goldenrod', 'goldenrod');
  const hoverColor = useColorModeValue('gray.800', 'white');
  const logo = useColorModeValue(lightLogo, darkLogo);

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