import { Flex, Box, Link as ChakraLink, Text, Image, ListItem, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import letterboxdLogo from '../assets/img/letterboxd-decal-dots-neg-rgb-500px.png';
import StarRating from './StarRating';

// Ajouter les icônes à la bibliothèque
library.add(fas, far);

const MovieListItem = ({ movie }) => {
  const titleColor = useColorModeValue('#319593', '#79e3d6');
  const hoverColor = useColorModeValue('black', 'white');

  return (
    <ListItem key={movie.id}>
      <Flex align="center">
        <ChakraLink as={RouterLink} to={`/movies/${movie.id}`} color={titleColor} _hover={{ color: hoverColor }} fontStyle="italic" fontWeight="bold">
          {movie.name}
        </ChakraLink>
        <Text as="span" mx={2}>-</Text>
        {movie.director} ({movie.year})
        <Box ml="4" mr="3">
          <StarRating rating={movie.rating} size="1x" />
        </Box>
        <ChakraLink href={movie.letterboxd_url} isExternal ml="2">
          <Image src={letterboxdLogo} alt="Letterboxd Info" boxSize="24px" />
        </ChakraLink>
      </Flex>
    </ListItem>
  );
};

export default MovieListItem;