import React, { useState, useEffect } from 'react';
import { Heading, Button, Box, Text, Flex, VStack, Image, Link as ChakraLink } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ColorModeToggle from './ColorModeToggle';
import { useColorModeValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import letterboxdLogo from '../assets/letterboxd-decal-dots-neg-rgb-500px.png';
import EditModal from './ModalEditMovie';
import DeleteMovie from './ModalDeleteMovie';
import { useNavigate } from 'react-router-dom';

const OneMoviePage = () => {
  const { id } = useParams(); // utilisez useParams pour récupérer l'id
  const [movie, setMovie] = useState(null);
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("black", "white");
  const titleColor = useColorModeValue('#319593', '#79e3d6');

  const handleMovieUpdate = (updatedMovie) => {
    setMovie(updatedMovie);
  };

  const navigate = useNavigate();
  const handleMovieDelete = () => {
    navigate("/movies");
  };
  
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`http://localhost:4500/movies/${id}`);
      console.log(response.data); // Affichez la réponse de l'API
      setMovie(response.data.movie);
    };
    
    fetchMovie();
  }, [id]); // utilisez id ici au lieu de match.params.id
  
  if (!movie) {
    return <Text>Loading...</Text>;
  }
    
  return (
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" justifyContent="center" alignItems="center" position="relative">
      <Flex position="absolute" top={5} right={5}>
        <ColorModeToggle />
      </Flex>
      <VStack spacing={8}>
        <Flex direction="row" alignItems="center">
          <Heading color={titleColor} mr={5}>{movie.name}</Heading>
        </Flex>
        <Box as="span" className="rating" ml="4">
          {[...Array(5)].map((_, i) => {
            if (movie.rating > i) {
              if (i === Math.floor(movie.rating) && movie.rating % 1 >= 0.5) {
                return <FontAwesomeIcon key={i} icon={['fas', 'star-half-alt']} color="goldenrod" size="2x" />
              }
  
              return <FontAwesomeIcon key={i} icon={['fas', 'star']} color="goldenrod" size="2x" />
            }
  
            return <FontAwesomeIcon key={i} icon={['far', 'star']} color="#808080" size="2x" />
          })}
        </Box>
        <Flex align="center">
          <Text>{movie.director} / {movie.year}</Text>
          <ChakraLink href={movie.letterboxd_url} isExternal ml="2">
            <Image src={letterboxdLogo} alt="Letterboxd Info" boxSize="24px" />
          </ChakraLink>
        </Flex>
        <Box maxWidth="80ch" margin="auto">
          <Text fontSize="lg" fontStyle="italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</Text>
        </Box>
        <Box textAlign="center">
          <EditModal
            movie={movie}
            onUpdate={handleMovieUpdate}
          />
          <DeleteMovie
            ml={5}
            movie={movie}
            onDelete={handleMovieDelete}
          />
        </Box>
        <Button as={Link} to="/movies" colorScheme='teal' size='md' _hover={{ textDecoration: 'none' }}>Back to all movies</Button>
      </VStack>
    </Flex>
  );
};

export default OneMoviePage;