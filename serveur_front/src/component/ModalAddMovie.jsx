// Import the necessary elements from Chakra UI, React's useState hook, and axios for making HTTP requests
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, FormControl, FormLabel } from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';

function MyModal() {
  // Use the useDisclosure hook from Chakra UI to control the opening and closing of the modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  // Set up state variables for the movie details
  const [name, setName] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [letterboxd_url, setUrl] = useState('');

  // Function to handle the submission of the form
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Create a new movie object with the current state values and the current date
    const movieAdd = {
      date: new Date(),
      name,
      director,
      year,
      rating,
      letterboxd_url,
    };

    try {
      // Post the new movie to the server
      const response = await axios.post('http://localhost:4500/movies', movieAdd);
      console.log(response.data);
      // Close the modal after the movie has been added
      onClose();
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Add a new movie</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent>
          <ModalHeader>Add a new movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              {/* Form controls for each of the movie details. The value prop is tied to the state variables and the onChange prop updates the state variables as the user types */}
              <FormControl isRequired></FormControl>
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

          {/* Modal footer with buttons to close the modal or submit the form */}
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