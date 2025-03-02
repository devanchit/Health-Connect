import React, { useContext, useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase-config";
import { Box, Button, Divider, Grid } from "@chakra-ui/react";
import { UserContext } from "../UserContext";

export const PatientReport = ({ reportuser }) => {
  const [files, setFiles] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const filesRef = ref(storage, `report/${reportuser}/${userInfo.username}`);
  console.log(filesRef);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await listAll(filesRef);

        const filePromises = response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { url, name: item.name };
        });

        const fileData = await Promise.all(filePromises);
        setFiles(fileData);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleButtonClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)">
      {files.map((file) => (
        <Box
          key={file.name}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.500"
          overflow="hidden"
          p={4}
          boxShadow="md"
          ml="5px"
          mt="10px"
          minW="450px"
        >
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            <Button>Click here to view</Button>
            <Divider my="2" />
          </a>
          <p>Report Name : {file.name}</p>
        </Box>
      ))}
    </Grid>
  );
};
