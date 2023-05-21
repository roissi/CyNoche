import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import axios from 'axios';

function ModalDeleteMovie({ movie, onDelete, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    try {
      const response = await axios.post(`http://localhost:4500/movies/delete/${movie.id}`);
      // handle response based on status
      if (response.status === 200) {
        console.log(response.data.message);
        onDelete();
        onClose();
      } else if (response.status === 404) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} {...props}>Delete this movie</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete this movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete <em>{movie.name}</em>?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalDeleteMovie;