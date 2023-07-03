// Import the necessary elements from Chakra UI and axios for making HTTP requests
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"

function ModalDeleteMovie({ movie, onDelete, ...props }) {
  // Use the useDisclosure hook from Chakra UI to control the opening and closing of the modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    
    // If the movie was deleted successfully, call the onDelete function (passed in as a prop) and close the modal
    await onDelete();

    // Close the modal
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen} {...props}>Delete this movie</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent>
          <ModalHeader>Delete this movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete <em>{movie.name}</em>?
          </ModalBody>

          {/* Modal footer with buttons to close the modal or submit the form */}
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalDeleteMovie;