import React, { useState } from "react";
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

export default function ReportShare() {
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");

  const uploadReport = () => {
    if (file == null) return;

    const fileRef = ref(storage, `report/${file.name}`);
    uploadBytes(fileRef, file).then(() => {
      alert("report uploaded");
    });
  };

  return (
    <Center h="80vh">
      <form>
        <FormControl isRequired mb="30px" maxW="800px">
          <FormLabel mx="2px" my="2px">
            Choose the type of Report
          </FormLabel>
          <Select
            options={options}
            onChange={(ev) => setValue(ev.value)}
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
          <Textarea></Textarea>
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
