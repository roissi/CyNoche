import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, FormControl, FormLabel } from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';

function MyModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [letterboxd_url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieAdd = {
      date: new Date(),
      name,
      director,
      year,
      rating,
      letterboxd_url,
    };

    try {
      const response = await axios.post('http://localhost:4500/movies', movieAdd);
      console.log(response.data);
      onClose();
    } catch (error) {
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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