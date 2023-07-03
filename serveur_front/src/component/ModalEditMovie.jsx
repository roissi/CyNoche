// Import the necessary elements from Chakra UI, useState and useEffect from React, and axios for making HTTP requests
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, FormControl, FormLabel } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyModal({ movie, onUpdate }) {
  // Use the useDisclosure hook from Chakra UI to control the opening and closing of the modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  // State variables for storing form inputs
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [letterboxd_url, setUrl] = useState("");

  // useEffect hook to set the form inputs to the current movie's details when the modal opens
  useEffect(() => {
    setName(movie.name);
    setDirector(movie.director);
    setYear(movie.year);
    setRating(movie.rating);
    setUrl(movie.letterboxd_url);
  }, [movie]);

  const handleSubmit = async () => {
    // Create a new object with the updated movie details
    const movieUpdate = {
      name,
      director,
      year,
      rating,
      letterboxd_url,
    };

    try {
      // Send a POST request to the update endpoint with the movie's id and the updated details
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/movies/update/${movie.id}`, movieUpdate);
      console.log(response.data);
      // Call the onUpdate callback with the updated movie details and close the modal
      onUpdate(movieUpdate);

      // Log the action
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/log`, {
        action: 'update',
        movie: {
          name,
          director,
          year,
          rating,
          letterboxd_url,
        },
        timestamp: new Date(),
      });
      
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    } finally {
      // Close the modal after the movie has been added or an error occurred
      onClose();
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Update this movie</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent>
          <ModalHeader>Update this movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              {/* Form controls for the movie details with validation */}
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Director</FormLabel>
                <Input placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Year</FormLabel>
                <Input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Rating</FormLabel>
                <Input placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>URL</FormLabel>
                <Input placeholder="Letterboxd URL" value={letterboxd_url} onChange={(e) => setUrl(e.target.value)} />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyModal;