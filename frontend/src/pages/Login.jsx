import { 
  Grid, GridItem, Box, 
  Text, Button, Link, useMediaQuery
} from '@chakra-ui/react'
import { useLogin } from '../hooks/useLogin';
import { Formik } from "formik";
import { LoginSchema } from '../Validations/UserValidation';
import TextField from '../components/Form/TextField';

export default function Login() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
          // navigate('/dashboard'); // Redirect to dashboard
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
          templateColumns={isNonMobile ? "repeat(4, 1fr)" : "repeat(1, 1fr)"}
          gap="30px"
          mx="auto"
          maxW={{ base: "100%", md: 500, xl: 600 }}
          m="20px"
        >
          <GridItem colSpan={isNonMobile ? 4 : 1} textAlign="center">
              <Text fontSize="xl" fontWeight="bold" my="30px">Login</Text>
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1}>
            <TextField label="Username or Email" name="usernameOrEmail" placeholder="Username or Email" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1}>
            <TextField label="Password" type="password" name="password" placeholder="Password" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1} justifyContent="center" display="flex">
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
              <GridItem colSpan={isNonMobile ? 4 : 1}>
                <Text>{error}</Text>
              </GridItem>
            )}
          <GridItem colSpan={isNonMobile ? 4 : 1} mb="30px">
            <Text display="flex">If you are new, please <Link href="/signup" mx="5px"> join us</Link>.</Text>
          </GridItem>
        </Grid>
      </Box>
    )}
    </Formik>
  )
}
