// Import necessary components from Chakra UI, react-router-dom, and FontAwesome
// Import the image file for the Letterboxd logo
import { Flex, Box, Link as ChakraLink, Text, Image, ListItem, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import letterboxdLogo from '../assets/img/letterboxd-decal-dots-neg-rgb-500px.png';
import StarRating from './StarRating';

// Add the solid and regular icon sets to the FontAwesome library
library.add(fas, far);

const MovieListItem = ({ movie }) => {
  // Use the useColorModeValue hook to change colors based on the current color mode
  const titleColor = useColorModeValue('#319593', '#79e3d6');
  const hoverColor = useColorModeValue('black', 'white');

  return (
    <ListItem key={movie.id}>
      <Flex align="center">
        {/* Link to the movie's page with the movie's name as the link text */}
        <ChakraLink as={RouterLink} to={`/movies/${movie.id}`} color={titleColor} _hover={{ color: hoverColor }} fontStyle="italic" fontWeight="bold">
          {movie.name}
        </ChakraLink>
        <Text as="span" mx={2}>-</Text>
        {/* Show the movie's director and year */}
        {movie.director} ({movie.year})
        <Box ml="4" mr="3">
          <StarRating rating={movie.rating} size="1x" />
        </Box>
        {/* Link to the movie's Letterboxd page with the Letterboxd logo as the link */}
        <ChakraLink href={movie.letterboxd_url} isExternal ml="2">
          <Image src={letterboxdLogo} alt="Letterboxd Info" boxSize="24px" />
        </ChakraLink>
      </Flex>
    </ListItem>
  );
};

export default MovieListItem;