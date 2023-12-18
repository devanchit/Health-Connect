// Example: MyFormModal.js
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  FormControl,
  Stack,
  FormHelperText
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Select } from "chakra-react-select";
import { options } from "../properties";

function MyFormModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [languages, setLanguages] = useState("");
  const [formData, setFormData] = useState({
    doctorName: "",
    firstname: "",
    email: "",
    name: "",
    password: "",
    qualification: "",
    specialty: "",
    photo: "",
    specializedTreatments: [],
    professionalBio: "",
    consultingLanguages: [],
    experienceInIndustry: 0,
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name: " + name + "value: " + value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  function handleselect(data) {
    //console.log(data);
    setLanguages(data);
  }

  const handleSubmit = async (ev) => {
    const valueList = languages.map((language) => language.value);
    formData.consultingLanguages = valueList;
    console.log(formData);
    
    ev.preventDefault();

    try {
      // Send a POST request to the Express server
      const response = await fetch('http://localhost:4000/addDoctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Doctor information saved successfully.');
        // Optionally, reset the form or perform other actions
      } else {
        console.error('Failed to save doctor information.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }

  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new Doctor's profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            {currentPage === 1 && (
              <Stack spacing={4}>
                <FormControl isRequired >
                  <FormLabel>Doctor Userame</FormLabel>
                  <Input
                    type="text"
                    name="doctorName"
                    placeholder="Create a unique username for doctor"
                    value={formData.doctorName}
                    onChange={handleChange}
                    required
                  />
                  
                </FormControl>

                <FormControl isRequired >
                  <FormLabel> Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="text"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Professional Bio</FormLabel>
                  <Input
                    type="text"
                    name="professionalBio"
                    value={formData.professionalBio}
                    onChange={handleChange}
                    placeholder="Ener a descriptive Professional Bio"
                    required
                  />
                </FormControl>

              </Stack>
            )}

            {currentPage === 2 && (
              <Stack spacing={4}>

                <FormControl>
                  <FormLabel> Experience In Industry </FormLabel>
                  <Input
                    type="text"
                    name="experienceInIndustry"
                    value={formData.experienceInIndustry}
                    onChange={handleChange}
                    placeholder="Experience In Industry"
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Qualification</FormLabel>
                  <Input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Specialty</FormLabel>
                  <Input
                    type="text"
                    name="specialty"
                    placeholder="Specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Photo URL</FormLabel>
                  <Input
                    type="text"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Specialized Treatments (comma-separated)
                  </FormLabel>
                  <Input
                    type="text"
                    name="specializedTreatments"
                    value={formData.specializedTreatments.join(",")}
                    onChange={(e) =>
                      handleArrayChange(e, "specializedTreatments")
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Consulting Languages</FormLabel>
                  <Select
                    options={options}
                    value={languages}
                    onChange={handleselect}
                    isMulti
                  ></Select>
                  {/* <Input placeholder="Consulting Languages" /> */}
                </FormControl>

                {/* <FormControl>
                  <FormLabel>AcademicDetails</FormLabel>
                  <Input placeholder="Academic Details" />
                </FormControl> */}

                {/* Add more form controls for page two */}
                <Button onClick={handlePreviousPage} colorScheme="blue">
            Previous
          </Button>
          <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
              </Stack>
            )}
            
          </form>
        </ModalBody>
        <ModalFooter>
          {currentPage > 1 && (
            <>
              
            </>
          )}
          {currentPage < 2 ? (
            <Button onClick={handleNextPage} colorScheme="blue">
              Next
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MyFormModal;
