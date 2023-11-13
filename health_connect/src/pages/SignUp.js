import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react'

import {Logo} from '../../src/components/SIgnInLogos/Logo' ;
//import {PasswordField} from '../../src/components/SIgnInLogos/PasswordField';
import {OAuthButtonGroup} from '../../src/components/SIgnInLogos/OAuthButtonGroup';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { UnlockIcon } from '@chakra-ui/icons';
 
  
export default function SignupPage(){
  const { isOpen, onToggle } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const toast  = useToast();
    const showToastSuccess = () =>{
    toast({
      title: "Successfull",
      description: "Account created Successfully",
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top',   // default is bottom
      icon: <UnlockIcon/>
    })
  }

  const showToastFailure = () =>{
    toast({
      title: "Failed",
      description: "Username/email should be unique",
      duration: 5000,
      isClosable: true,
      status: 'error',
      position: 'top',   // default is bottom
      icon: <UnlockIcon/>
    })
  }
  const onClickReveal = () => {
    onToggle()
   
  }

  // @ts-ignore
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      body: JSON.stringify({username,password,email}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      showToastSuccess();
    } else {
      showToastFailure();
    }
    
  }

 return(

    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Create your account</Heading>
            <Text color="fg.muted">
              Already have an account? <Link href="/signin">Sign in</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input  value={username} onChange={ev => setUsername(ev.target.value)}  type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="text"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                      />
                    </InputRightElement>
                    <Input
                      id="password"
                      name="password"
                      type={isOpen ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      onChange={ev => setPassword(ev.target.value)}           
                    />
                </InputGroup>
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button onClick={register}>Sign in</Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}