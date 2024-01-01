import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Grid,
  HStack,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Chat } from "./Chat";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [roomname, setRoomname] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a POST request to the Express server
        const response = await fetch("http://localhost:4000/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDoctors(data);

          // Optionally, reset the form or perform other actions
        } else {
          console.error("Failed to save doctor information.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleChatClick = (doctorName) => {
      setRoomname(doctorName + userInfo.username);
    console.log(roomname);
  };
  const resetRoomname = () => {
    setRoomname(null);
    console.log(roomname);
  };

  return (
    <>
      {!roomname ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {doctors.map((doctor) => (
            // <li key={doctor._id}>
            //   <strong>{doctor.doctorName}</strong> - {doctor.specialty}
            // </li>
            <>
              <Box m="4px" minW={400} minH={500}>
                <Image
                  src="https://images.unsplash.com/photo-1667420170858-39d40cb413e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Svartifoss Waterfall"
                  borderRadius="xl"
                  objectFit="cover"
                  mx="auto"
                />
                <HStack mt="5" spacing="3">
                  <Tag variant="outline">
                    Languages: {doctor.consultingLanguages.join(", ")}
                  </Tag>

                  <Tag variant="outline">
                    Qualification: {doctor.qualification}
                  </Tag>
                </HStack>
                <Divider my="2" />
                <Heading my="4" size="sm">
                  Name : {doctor.name}
                </Heading>
                <Heading my="4" size="sm">
                  Username : {doctor.doctorName}
                </Heading>
                <Divider my="2" />
                <Text minH={100}>{doctor.professionalBio}</Text>
                <Center my="6">
                  <Button
                    colorScheme="blue"
                    onClick={() => handleChatClick(doctor.doctorName)}
                  >
                    {" "}
                    Chat{" "}
                  </Button>
                </Center>
              </Box>
            </>
          ))}
        </Grid>
      ) : (
        <>
            <Button onClick={resetRoomname} m="5px" bg={"gray.700"} color={"white"}  fontSize={"sm"}
                fontWeight={600} > Back </Button>
              
              <Button as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"gray.700"}
                href={"/reportupload"}
                _hover={{
                  bg: "gray.550",
                }} > Share reports   </Button>
            <Chat room = {roomname}/>
               
        </>
        
      )}
    </>
  );
};

export default Home;
