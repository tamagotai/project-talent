import { 
  Grid, GridItem, Box, Link as ChakraLink, 
  Text, Button
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { Formik } from "formik";
import { LoginSchema } from '../Validations/UserValidation';
import FloatTextField from '../components/Form/FloatTextField';

export default function Login() {
  const { login, isLoading, error } = useLogin();
  const initialValues = {    
    usernameOrEmail: '',
    password: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        console.log("Submitting with values:", values); // Log the values before submitting
        login(
          values.usernameOrEmail,
          values.password,
        ).then(response => {
          console.log("Login success:", response); // Log successful response
        })
        .catch((err) => {
          console.log("Login error:", err); // Log any error
          actions.setSubmitting(false);
          actions.setErrors({ submit: err.message });
        });
        actions.resetForm();
      }}
    >
    {formik => (
      <Box 
        as="form"
        onSubmit={formik.handleSubmit} 
        maxW="xl" 
        alignContent="center"
        justifySelf="center"
        mx="auto"
        background="white"
      >
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
          gap="30px"
          mx="auto"
          maxW={{ base: "100%", md: 500, xl: 600 }}
          m="20px"
        >
          <GridItem colSpan={[1, 4]} textAlign="center">
              <Text fontSize="xl" fontWeight="bold" my="30px">Login</Text>
          </GridItem>
          <GridItem colSpan={[1, 4]}>
            <FloatTextField label="Username or Email" name="usernameOrEmail" placeholder="Username or Email" />
          </GridItem>
          <GridItem colSpan={[1, 4]}>
            <FloatTextField label="Password" type="password" name="password" placeholder="Password" />
          </GridItem>
          <GridItem colSpan={[1, 4]} justifyContent="center" display="flex">
            <Button
              colorScheme="green"
              fontWeight="bold"
              mt="4"
              type="submit"
              disabled={isLoading}
            >
              Login
            </Button>
          </GridItem>
            {error && (
              <GridItem colSpan={[1, 4]}>
                <Text>{error}</Text>
              </GridItem>
            )}
          <GridItem colSpan={[1, 4]} mb="30px">
            <Text display="flex">If you are new, please <ChakraLink color="green" as={RouterLink} to="/signup" mx="5px">join us</ChakraLink>.</Text>
          </GridItem>
        </Grid>
      </Box>
    )}
    </Formik>
  )
}
