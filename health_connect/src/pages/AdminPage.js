import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Divider, VStack, useDisclosure } from "@chakra-ui/react";
import { Image, Heading, Text, Box, useColorModeValue } from "@chakra-ui/react";
import BasicUsage from "../components/ModalDialog";
import MyModal from "../components/ModalDialog";
import MyFormModal from "../components/Modal";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase-config";

export default function AdminPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const username = userInfo.username;
  const role = userInfo.role;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageList,setImageList] = useState({});

   

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
    };
    



    const fetchImages = async () => {
      const imagesListRef = ref(storage, `doctor/unknown`);
      const response = await listAll(imagesListRef);

      const urls = await Promise.all(
        response.items.map((item) => getDownloadURL(item))
      );

      setImageList(urls); // Save all image URLs at once
    };

    fetchImages();
    fetchData();
    console.log(imageList);
    // const filesRef = ref(storage, `doctor/${formData.doctorName}/profilephoto`);
    // const imagesListRef = ref(storage, `doctor/unknown`);
    // listAll(imagesListRef).then((response) => {
    //   const urls = {};
    //   response.items.forEach((item, index) => {
    //     getDownloadURL(item).then((url) => {
    //       urls[index] = url; // Map URLs by index
    //       setImageList((prev) => ({ ...prev, ...urls }));
    //       console.log(imageList)
    //     });
    //   });
    // });
  
  }, [userInfo,role]);

  //username = userInfo?.username;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    {username == "admin" && (
          <>
      <Box
        as="button"
        bg="blue.500"
        color="white"
        px="4"
        py="2"
        //   mt="100px"
        ml="10px"
        mb="10px"
        borderRadius="md"
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.700" }}
        _focus={{ boxShadow: "outline" }}
        onClick={handleOpenModal}
      >
        Add Doctor
      </Box>
      </>)}

      <MyFormModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className="admin">
        {username == "admin" && (
          <>
            {doctors.map((doctor,index) => (
              <Box
                maxW="xl"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                p="6"
                mb="20px"
                ml="10px"
                bg="white"
              >
                {/* Profile Image */}
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={imageList[index]}
                  alt="Profile Image"
                  mx="auto"
                  mb="4"
                />

                {/* Heading */}
                <Heading as="h3" size="lg" textAlign="center" mb="4">
                  {doctor.name}
                </Heading>
                <Divider my="4" />
                <VStack spacing="3" align="start">
                  <Text>Username : {doctor.doctorName}</Text>
                  <Text>
                    Languages: {doctor.consultingLanguages.join(", ")}
                  </Text>
                  <Text>Qualification: {doctor.qualification}</Text>
                  <Text>
                    Sprecialized Treatements:{" "}
                    {doctor.specializedTreatments.join(", ")}
                  </Text>
                  <Divider my="4" />
                  <Text py="2">{doctor.professionalBio}</Text>
                  <Divider my="4" />
                </VStack>
              </Box>
            ))}
          </>
        )}

        {username != "admin" && <>You are not an Admin User.</>}
      </div>
    </>
  );
}
