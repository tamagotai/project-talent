import { Flex, Box, VStack, Text, Divider, Input, Button, FormControl, FormLabel, Link} from '@chakra-ui/react'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login, error, isLoading} =useLogin()

  const handleLogin = async(e) => {
    e.preventDefault();
    await login(usernameOrEmail, password)
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
        <Text fontSize="xl" fontWeight="bold">Login</Text>
        <Flex align="center">
          <Box className="left" display="flex" flexDirection="column" my={2}>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              onClick={google}
              my={1}
            >
              Google
            </Button>
            <Button
              leftIcon={<FaFacebook />}
              colorScheme="facebook"
              onClick={facebook}
              my={1}
            >
              Facebook
            </Button>
            <Button
              leftIcon={<FaGithub />}
              colorScheme="gray"
              onClick={github}
              my={1}
            >
              Github
            </Button>
          </Box>
          <Divider orientation="vertical" mx="4" />
          <Box className="right">
            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel>Username or Email</FormLabel>
                <Input 
                  type="text" 
                  value={usernameOrEmail} 
                  onChange={(e) => setUsernameOrEmail(e.target.value)} 
                  mb="4"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  mb="4"
                />
              </FormControl>

              <Button 
                disabled={isLoading} 
                type="submit" 
                colorScheme="green" 
                fontWeight="bold"
              >
                Login
              </Button>
              {error && <Text>{error}</Text>}
            </form>
          </Box>
        </Flex>
        <Text display="flex">If you are new, please <Link href="/signup" mx="2px"> join us  </Link>.</Text>
      </VStack>
    </Flex>  
  )
}
