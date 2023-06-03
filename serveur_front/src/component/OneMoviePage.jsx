import React, { useState, useEffect } from 'react';
import { Heading, Button, Box, Text, Flex, VStack, Image, Spinner, Link as ChakraLink } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import ColorModeToggle from './ColorModeToggle';
import { useColorModeValue } from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';
import letterboxdLogo from '../assets/img/letterboxd-decal-dots-neg-rgb-500px.png';
import EditModal from './ModalEditMovie';
import DeleteMovie from './ModalDeleteMovie';
import { useNavigate } from 'react-router-dom';
import { fetchMovieFromDatabase, fetchMovieDetailsFromTMDB } from '../contexts/MovieService';
import StarRating from './StarRating';

// The OneMoviePage component displays details of a single movie
const OneMoviePage = () => {
  // Use useParams to get the movie id from the route parameters
  const { id } = useParams();
  // State variables for movie, movieDetails, language, error and isLoading
  const [movie, setMovie] = useState(null);
  const bgColor = useColorModeValue("#e4fff7", "gray.800");
  const color = useColorModeValue("black", "white");
  const titleColor = useColorModeValue('#319593', '#79e3d6');
  const [movieDetails, setMovieDetails] = useState(null);
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle updating of movie data after edit
  const handleMovieUpdate = (updatedMovie) => {
    setMovie(updatedMovie);
  };

  // Function to handle deletion of movie
  const navigate = useNavigate();
  const handleMovieDelete = () => {
    navigate("/movies");
  };
  
  // Function to toggle language between 'en' and 'fr'
  const toggleLanguage = () => {
    setLanguage((prevLang) => prevLang === 'en' ? 'fr' : 'en');
  };

  // UseEffect to fetch the movie and its details when the component mounts or id changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movie = await fetchMovieFromDatabase(id);
        const movieData = await fetchMovieDetailsFromTMDB(id);
        setMovie(movie);
        setMovieDetails(movieData);
        setError(null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Display loading spinner while fetching data
  if (isLoading) {
    return (
      // JSX for loading state
      <Flex justify="center" align="center" minH="100vh">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.800'
          color='goldenrod'
          size='xl'
        />
      </Flex>
    )
  }
  // Display error message if an error occurred during fetching
  if (error) {
    return <Text>Une erreur s&apos;est produite lors de la récupération des détails du film. Veuillez réessayer.</Text>;
  }
  // Display message if no movie was found
  if (!movie) {
    return <Text>Pas de film trouvé.</Text>;
  }
  
  // Display movie details
  return (
    // JSX for displaying movie details
    <Flex direction="column" bgColor={bgColor} color={color} w="100%" minH="100vh" justifyContent="center" alignItems="center" position="relative">
      <Flex position="absolute" top={5} right={5}>
        <ColorModeToggle />
      </Flex>
      <VStack spacing={8}>
        <Flex direction="row" alignItems="center" w="full" justifyContent="center">
          <Heading size="2xl" color={titleColor}>{movie.name}</Heading>
        </Flex>
        <Box as="span" className="rating" ml="4">
          <StarRating rating={movie.rating} size="2x" />
        </Box>
        <Flex align="center">
          <Text fontSize="2xl">{movie.director} / {movie.year}</Text>
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
              boxShadow="dark-lg"
            />
          </Box>
        }
        <Box maxWidth="80ch" margin="auto">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontStyle="italic">
              {movie ? (language === 'en' ? movie.overview_en : movie.overview_fr) : 'No overview available'}
            </Text>
          </Flex>
        </Box>
        <Box textAlign="center">
          <Button 
            variant='outline' 
            colorScheme='teal' 
            onClick={toggleLanguage} 
            leftIcon={<FaBook />} // positionner l'icône à gauche
            mr={5} // pour ajouter un peu d'espace à droite
          >
            {language === 'en' ? 'FR' : 'UK'} 
          </Button>
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
        <Button as={Link} to="/movies" colorScheme='teal' size='md'>Back to all movies</Button>
      </VStack>
    </Flex>
  );
};

export default OneMoviePage;