import React, { useState, useEffect } from 'react';
import { Heading, Button, Box, Text, Flex, VStack, Image, Link as ChakraLink } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ColorModeToggle from './ColorModeToggle';
import { useColorModeValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import letterboxdLogo from '../assets/img/letterboxd-decal-dots-neg-rgb-500px.png';
import EditModal from './ModalEditMovie';
import DeleteMovie from './ModalDeleteMovie';
import { useNavigate } from 'react-router-dom';

const OneMoviePage = () => {
  const { id } = useParams(); // utilisez useParams pour récupérer l'id
  const [movie, setMovie] = useState(null);
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("black", "white");
  const titleColor = useColorModeValue('#319593', '#79e3d6');
  const [movieDetails, setMovieDetails] = useState(null);

  const handleMovieUpdate = (updatedMovie) => {
    setMovie(updatedMovie);
  };

  const navigate = useNavigate();
  const handleMovieDelete = () => {
    navigate("/movies");
  };
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/movies/${id}`);
        setMovie(response.data.movie);
        
        const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/movie/${response.data.movie.tmdb_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
        const movieData = tmdbResponse.data;
        const posterUrl = movieData.poster_path ? `https://image.tmdb.org/t/p/original${movieData.poster_path}` : null;
        movieData.posterUrl = posterUrl;

        console.log('TMDB movie details:', movieData);
        setMovieDetails(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    
    fetchMovie();
  }, [id]);
  
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
        {movieDetails && movieDetails.posterUrl && 
          <Box my="4">
            <Image
              src={movieDetails.posterUrl}
              alt="Movie Poster"
              width="250px"
            />
          </Box>
        }
        <Box maxWidth="80ch" margin="auto">
          <Text fontSize="lg" fontStyle="italic">{movieDetails ? movieDetails.overview : 'No overview available'}</Text>
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