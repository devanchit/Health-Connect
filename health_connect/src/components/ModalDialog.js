// Example: MyModal.js
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

function MyModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input  placeholder="First Name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder="Last Name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Qualification</FormLabel>
            <Input  placeholder="Qualification" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Specialty</FormLabel>
            <Input  placeholder="Specialty" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Specialized Treatments</FormLabel>
            <Input  placeholder="Specialized Treatments" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Consulting Languages</FormLabel>
            <Input  placeholder="Consulting Languages" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>AcademicDetails</FormLabel>
            <Input  placeholder="Academic Details" />
          </FormControl>

        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3}>Save changes</Button>
          <Button colorScheme="blue"  onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MyModal;
