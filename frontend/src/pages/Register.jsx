import { useState } from 'react';
import { Flex, Box, VStack, Text, Divider, Input, Button } from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

export default function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TBU: registration logic
        console.log(formData);
    };

  return (
    <Flex className="register" align="center" justify="center" h="calc(100vh - 50px)">
      <VStack spacing="8">
        <Text fontSize="xl" fontWeight="bold">Register</Text>
        <Box as="form" onSubmit={handleSubmit} w="full">
          <VStack spacing="4">
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </VStack>
          <Button
            colorScheme="purple"
            fontWeight="bold"
            mt="4"
            type="submit"
          >
            Register
          </Button>
        </Box>
        <Divider />
        <VStack spacing="4">
          <Button 
            leftIcon={<FaGoogle />} 
            colorScheme="red" 
            // onClick={handleGoogleSignup}
          >
            Sign up with Google
          </Button>
          <Button 
            leftIcon={<FaFacebook />} 
            colorScheme="blue" 
            // onClick={handleFacebookSignup}
          >
            Sign up with Facebook
          </Button>
          <Button 
            leftIcon={<FaGithub />} 
            colorScheme="black" 
            // onClick={handleGithubSignup}
          >
            Sign up with GitHub
          </Button>
        </VStack>
      </VStack>
    </Flex>
  )
}
