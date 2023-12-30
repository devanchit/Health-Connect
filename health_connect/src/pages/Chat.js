import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

//import "../styles/Chat.css";
import { UserContext } from "../UserContext";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    // const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
    //   let messages = [];
    //   snapshot.forEach((doc) => {
    //     messages.push({ ...doc.data(), id: doc.id });
    //   });
    //   console.log(messages);
    //   setMessages(messages);
    // });

    // return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userInfo.username,
      room: room,
    });

     setNewMessage("");
  };

  return (
    <Box>
      <Flex h="69vh" w="99%" direction="column" overflowX="scroll" p="3" >
        {messages.map((message) => {
          if (message.user == userInfo.username) {
            return (
              <Flex key={message.id} className="message" justify="flex-end">
                <Flex
                  bg="green.700"
                  color="white"
                  minW="100px"
                  maxW="350px"
                  my="1"
                  p="3"
                >
                  {/* <Text fontSize='6px' > {message.user}: </Text> */}
                  <Text fontSize='15px' > {message.text} </Text>
                </Flex>
              </Flex>
            );
          } else {
            return (
              <Flex key={message.id} className="message">
                <Flex
                  bg="gray.700"
                  color="white"
                  minW="100px"
                  maxW="350px"
                  my="1"
                  p="3"
                >
                  {/* <Text fontSize='sm' >{message.user}:</Text> */}
                  <Text fontSize='15px' >{message.text}</Text>
                </Flex>
              </Flex>
            );
          }
        })}
        </Flex>
      <form onSubmit={handleSubmit} >
        <Input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
          />
        <Button type="submit" className="send-button" mb="20px" mt="10px" ml = "10px">
          Send
        </Button>
      </form>
      </Box>
    
  );
};
