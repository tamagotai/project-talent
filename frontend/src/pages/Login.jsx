import { Flex, Box, VStack, Text, Divider, Input, Button, FormControl, FormLabel} from '@chakra-ui/react'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { useState } from 'react';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    // Call the login API with usernameOrEmail and password
  };

  const google = () => {
      window.open("http://localhost:5000/auth/google", "_self");
    };
  
  const github = () => {
      window.open("http://localhost:5000/auth/github", "_self");
    };
  
  const facebook = () => {
      window.open("http://localhost:5000/auth/facebook", "_self");
    };

  return (
    <Flex className="login" align="center" justify="center" h="calc(100vh - 50px)">
      <VStack spacing="8">
        <Text fontSize="xl" fontWeight="bold">Choose a Login Method</Text>
        <Flex align="center">
          <Box className="left">
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              onClick={google}
            >
              Google
            </Button>
            <Button
              leftIcon={<FaFacebook />}
              colorScheme="facebook"
              onClick={facebook}
            >
              Facebook
            </Button>
            <Button
              leftIcon={<FaGithub />}
              colorScheme="gray"
              onClick={github}
            >
              Github
            </Button>
          </Box>
          <Divider orientation="vertical" mx="4" />
          <Box className="right">
            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel>Username or Email</FormLabel>
                <Input type="text" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} mb="4"/>
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb="4"/>
              </FormControl>

              <Button type="submit" colorScheme="purple" fontWeight="bold">Login</Button>
            </form>
          </Box>
        </Flex>
      </VStack>
    </Flex>  
  )
}
