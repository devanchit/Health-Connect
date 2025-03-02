"use client";

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  useToast,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, UnlockIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.svg";


export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const toast  = useToast();
    const showLogoutSuccess = () =>{
    toast({
      title: "Successfull",
      description: "Successfully Logged out.",
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top',   // default is bottom
      icon: <UnlockIcon/>
    })
  }

  const { setUserInfo, userInfo } = useContext(UserContext);
  //const [username, setUsername] = useState('');
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      method: 'GET',
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log("Received userInfo:", userInfo);
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then(() => {
        console.log("Logout successful");
        showLogoutSuccess();
        setUserInfo(null);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });

    navigate("/signin");
  }

  const username = userInfo?.username;

  return (
    <>
      <div className="navbar" zIndex="100" >
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} position="fixed" top="0" width="100%" zIndex="100" >
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box>
            <Image
            src={logo}
            alt="Logo"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
            boxSize="100px" // Sets both width and height to 100px
            width="80px" // Custom width
            height="50px"
            zIndex="100" 
          />

            </Box>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                {username && (
                  <>
                    <button onClick={logout}>Logout ({username})</button>
                    <button>
                      {" "}
                      <NavLink to="/admin">Admin</NavLink>{" "}
                    </button>
                  </>
                )}

                {!username && (
                  <>
                    <Button
                      as={"a"}
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"gray.700"}
                      href={"/signin"}
                      _hover={{
                        bg: "gray.550",
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      as={"a"}
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"gray.700"}
                      href={"/signup"}
                      _hover={{
                        bg: "gray.550",
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://api.dicebear.com/9.x/pixel-art/svg?seed=John"
                      }
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://api.dicebear.com/9.x/pixel-art/svg?seed=John"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      {username && (
                        <>
                          <p>({username})</p>
                        </>
                      )}
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </div>
    </>
  );
}
