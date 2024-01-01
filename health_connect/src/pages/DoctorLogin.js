// Save this code in a file with a .jsx or .js extension (e.g., LoginPage.jsx)

import React, { useContext, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../UserContext";

const DoctorLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/doctorsignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        // console.log("Login successful. User info:", userInfo);
        
        // Perform any actions you need upon successful login
        navigate("/doctorHome");
      } else {
        console.error("Login failed. Invalid credentials.");
        // Handle login failure, show an error message, etc.
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors (network issues, etc.)
    }
  };

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing={8} mx="auto" maxW="md" py={12} px={6}>
          <Heading textAlign="center" fontSize="3xl">
            Log in to Your Account
          </Heading>
          <Box
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="base"
            p={8}
            rounded="md"
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleLogin}>
                Log in
              </Button>
            </Stack>
          </Box>
          <Text mt={4} textAlign="center" fontSize="sm">
            Don't have an account?{" "}
            <Link color="blue.500" href="#">
              Sign up
            </Link>
          </Text>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default DoctorLoginPage;
