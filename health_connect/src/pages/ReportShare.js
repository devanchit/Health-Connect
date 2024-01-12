import React, { useContext, useEffect, useState } from "react";
import { UnlockIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";
import { Select } from "chakra-react-select";

import { options } from "../properties";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase-config";
import { UserContext } from "../UserContext";

export default function ReportShare() {
  const [report, setReport] = useState("");
  const [file, setFile] = useState("");
  const [comment, setComment] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [doctor, setDoctor] = useState([]);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a POST request to the Express server
        const response = await fetch("http://localhost:4000/doctorsList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          const usernames = data.map((doctor) => ({
            value: doctor.doctorName,
            label: doctor.doctorName,
          }));
    
         
          
          setUsernames(usernames);
          // Optionally, reset the form or perform other actions
        } else {
          console.error("Failed to save doctor information.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    };

    fetchData();
    
  }, []);

  const uploadReport = () => {
    if (file == null) return;

    console.log(comment);
    console.log(report)

    const fileRef = ref(storage, `report/${userInfo.username}/${doctor}/${report}`);
    uploadBytes(fileRef, file).then(() => {
      alert("report uploaded");
    });
  };

  return (
    <Center h="90vh">
      <form>
        <FormControl isRequired mb="30px" maxW="800px">
          <FormLabel mx="2px" my="2px">
            Choose the type of Report
          </FormLabel>
          <Select
            options={options}
            onChange={(ev) => setReport(ev.value)}
          ></Select>
          <FormHelperText>Enter a descriptive name</FormHelperText>
        </FormControl>

        <FormControl isRequired mb="30px" maxW="800px">
          <FormLabel mx="2px" my="2px">
            Choose the Doctor's Username
          </FormLabel>
          <Select
            options={usernames}
            onChange={(ev) => setDoctor(ev.value)}
          ></Select>
          <FormHelperText>Enter a descriptive name</FormHelperText>
        </FormControl>

        <Divider my="2" />

        <FormControl isRequired mb="30px" maxW="800px">
          <FormLabel my="2px">Choose File</FormLabel>
          <Input
            display="block"
            type="file"
            name="file"
            mt="10px"
            border="none"
            accept="application/pdf"
            onChange={(ev) => setFile(ev.target.files[0])}
          />
          <FormHelperText>Upload File in pdf format</FormHelperText>
        </FormControl>

        <Divider my="2" />

        <FormControl mb="30px" maxW="1000px">
          <FormLabel mx="2px" my="2px">
            Any Comments
          </FormLabel>
          <Textarea
          onChange={(ev) => setComment(ev.target.value)}
          />
          <FormHelperText>
            Anything Specific related to the report uploaded
          </FormHelperText>
        </FormControl>

        <Button display="block" type="button" my="20px" onClick={uploadReport}>
          Submit
        </Button>
      </form>
    </Center>
  );
}
