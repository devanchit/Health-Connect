import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import BasicUsage from "../components/ModalDialog";
import MyModal from "../components/ModalDialog";
import MyFormModal from "../components/Modal";

export default function Admin() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const username = userInfo.username;
  const role = userInfo.role;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/admin", {
        method: "POST",
        body: JSON.stringify({ username, role }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }

      if (response.status === 403) {
        // If response status is 403, show an alert

        console.log("Access forbidden. Only admin can access this page.");
      }

      // try {
      //   const doctors = await fetch('http://localhost:3000/api/doctors');
      //   if (response.ok) {
      //     const data = await response.json();
      //     setDoctors(data);
      //   } else {
      //     console.error('Failed to fetch doctors data');
      //   }
      // } catch (error) {
      //   console.error('Error fetching doctors data:', error);
      // }
    };
    fetchData();
  }, [userInfo]);

  //username = userInfo?.username;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function BasicUsage() {
    return (
      <Modal>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>abc</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <>
      {username == "admin" && (
        <>
          <Box
            bg={"#808a63"}
            px={4}
            width="70%"
            mt="50px"
            position={"center"}
            ml="15%"
            alignItems={"center"}
          >
            <ButtonGroup
              size="sm"
              isAttached
              variant="outline"
              mt="10px"
              mb="10px"
            >
              <Button onClick={handleOpenModal}>Add Doctors</Button>
              {/* <MyModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
              <MyFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
              <IconButton
                aria-label="Add to friends"
                icon={<AddIcon />}
                onClick={handleOpenModal}
              />
            </ButtonGroup>
          </Box>
          {doctors.map((doctor) => (
            // <li key={doctor._id}>
            //   <strong>{doctor.doctorName}</strong> - {doctor.specialty}
            // </li>
            <>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                maxW="50%"
                mt="20px"
                //align='center'
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{doctor.name}</Heading>
                    <Heading as="h6" size="xs">
                      Username : {doctor.doctorName}
                    </Heading>
                    <Divider my="4" />
                    <Text py="2">{doctor.professionalBio}</Text>
                    <Divider my="4" />
                    <Heading size="sm">
                      Languages: {doctor.consultingLanguages.join(", ")}
                    </Heading>

                    <Divider my="4" />
                    <Heading size="sm">
                      Qualification: {doctor.qualification}
                    </Heading>

                    <Divider my="4" />
                    <Heading size="sm">
                      Sprecialized Treatements:{" "}
                      {doctor.specializedTreatments.join(", ")}
                    </Heading>
                  </CardBody>

                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      Buy Latte
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </>
          ))}
        </>
      )}

      {username != "admin" && <>Admin banja bhadwe Pehle</>}
    </>
  );
}
