import { Box, Badge, Image, Text, VStack, HStack, Grid, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Chat } from "../components/Chat";
import { PatientReport } from "../components/PatientReport";

const PatientCard = () => {
  const [users,setUsers] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [roomname, setRoomname] = useState(null);
  const [showPatientReport, setShowPatientReport] = useState(false); // New state variable
  const [reportuser, SetReportUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a POST request to the Express server
        const response = await fetch("http://localhost:4000/patients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);

          // Optionally, reset the form or perform other actions
        } else {
          console.error("Failed to save users information.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    };

    fetchData();
  }, []);

  const handleChatClick = (patientname) => {
    setRoomname(userInfo.username + patientname);
  console.log(roomname);
};

const handleViewDocumentsClick = (reportuser1) => {
    // Set the state variable to true when "View Documents" is clicked
    SetReportUser(reportuser1)
    console.log(reportuser1 + "hhhhhh");
    setShowPatientReport(true);
  };

const handleBackClick = () => {
    setRoomname(null);
    setShowPatientReport(false);
   
    
  };

  return (
      <>
       {!roomname && !showPatientReport ? (
      <Grid templateColumns="repeat(3, 1fr)">
      {users.map((user) => (
    <Box
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
      <Image src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw36P9uLTBbR8DU89pC-Bmth&ust=1704128658284000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCIin-YyUuoMDFQAAAAAdAAAAABAE"} alt={"Profile"} />

      <VStack align="start" spacing={4} mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          {user.username}
        </Text>
        <Text>24 years old</Text>

        <HStack>
          <Badge colorScheme="blue">Male</Badge>
          <Badge colorScheme="green">0+</Badge>
        </HStack>

        <Text>Cough and cold</Text>
        <HStack>
        <Button bg={"gray.700"} color={"white"}  fontSize={"sm"}
                fontWeight={600}  onClick={() => handleChatClick(user.username)} > See Chats </Button>
        
        <Button bg={"gray.700"} color={"white"}  fontSize={"sm"}
                fontWeight={600}  onClick={() => handleViewDocumentsClick(user.username)} > View Documents </Button>
        </HStack>
        
      </VStack>
    </Box>
    ))}
    </Grid>
    ) : (
        <>
            <Button onClick={handleBackClick} m="5px" bg={"gray.700"} color={"white"}  fontSize={"sm"}
                fontWeight={600} > Back </Button>

            {showPatientReport && <PatientReport reportuser = {reportuser} />}
              
            {roomname && <Chat room = {roomname}/>}
               
        </>
        
      )}
    </>
  );
};

export default PatientCard;
