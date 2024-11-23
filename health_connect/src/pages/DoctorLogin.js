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
  useToast,
} from "@chakra-ui/react";
import { UserContext } from "../UserContext";
import { UnlockIcon } from "@chakra-ui/icons";

const DoctorLoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const toast  = useToast();
  const showToastSuccess = () => {
    console.log("showToastSuccess called");
    toast({
      title: "Successfull",
      description: "Successfully Logged in.",
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top',
      icon: <UnlockIcon />,
    });
  };
  

  const showToastFailure = () =>{
    toast({
      title: "Failed",
      description: "Wrong Credentials.",
      duration: 5000,
      isClosable: true,
      status: 'error',
      position: 'top',   // default is bottom
      icon: <UnlockIcon/>
    })
  }


  const handleLogin = async () => {
    // e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/doctorsignin", {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();
        showToastSuccess();
        setUserInfo(userInfo);
        // console.log("Login successful. User info:", userInfo);
        navigate("/doctorHome");
      } else {
        showToastFailure();
        console.error("Login failed. Invalid credentials.");
        
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors (network issues, etc.)
    }
  };

  return (
    
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
    
  );
};

export default DoctorLoginPage;
