import { 
  Text, Button, Box, GridItem,
  Grid, Link as ChakraLink 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik } from "formik";
import { useSignup } from '../hooks/useSignup';
import { SignupSchema } from '../Validations/UserValidation';
import FloatTextField from '../components/Form/FloatTextField';
import RadioInput from '../components/Form/RadioInput';

export default function Signup() {
  const { signup, isLoading, error } = useSignup();
  const initialValues = {
    role: 'talent',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    landline: '',
    password: '',
    confirmPassword: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        console.log("Submitting with values:", values); // Log the values before submitting
        signup(
          values.role,
          values.username,
          values.firstname,
          values.lastname,
          values.email,
          values.mobile,
          values.landline,
          values.password,
          values.confirmPassword
        ).then(response => {
          console.log("Signup success:", response); // Log successful response
          actions.resetForm();
        })
        .catch((err) => {
          console.log("Signup error:", err); // Log any error
          actions.setSubmitting(false);
          actions.setErrors({ submit: err.message });
        });
        
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
        display="flex"
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center"
      >        
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
          gap="30px"
          mx="auto"
          maxW={{ base: "100%", md: 500, xl: 600 }}
          m="20px"
        > 
          <GridItem colSpan={[1, 4]} textAlign="center">
              <Text fontSize={["md", "xl"]} fontWeight="bold" my="30px">Sign Up</Text>
          </GridItem>
          <GridItem colSpan={[1, 4]}>
            <RadioInput
              label="Select your role"
              name="role"
              options={[
                { label: 'Talent', value: '2' },
                { label: 'Project Organiser', value: '3' },
              ]}
              {...formik}
            />
          </GridItem>       
          <GridItem colSpan={[1, 4]}>
            <FloatTextField {...formik} label="Username" name="username" placeholder="Username" />
          </GridItem>
          <GridItem colSpan={[1, 2]}>         
            <FloatTextField {...formik} label="Firstname" name="firstname" placeholder="Firstname" />
          </GridItem>
          <GridItem colSpan={[1, 2]}> 
            <FloatTextField {...formik} label="Lastname" name="lastname" placeholder="Lastname" />
          </GridItem>
          <GridItem colSpan={[1, 4]}>       
            <FloatTextField {...formik}label="Email" name="email" placeholder="Email" />
          </GridItem>
          <GridItem colSpan={[1, 2]}>
            <FloatTextField {...formik} label="Mobile" type="tel" name="mobile" placeholder="Mobile" />
          </GridItem>
          <GridItem colSpan={[1, 2]}>
            <FloatTextField {...formik} label="Landline" type="tel" name="landline" placeholder="Landline" />
          </GridItem>
          <GridItem colSpan={[1, 4]}>
            <FloatTextField {...formik} label="Password" type="password" name="password" placeholder="Password" />
          </GridItem>
          <GridItem colSpan={[1, 4]}>
            <FloatTextField {...formik} label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm password" />
          </GridItem>
          <GridItem colSpan={[1, 4]} justifyContent="center" display="flex">
            <Button
              colorScheme="green"
              fontWeight="bold"
              mt="4"
              type="submit"
              disabled={isLoading}
            >
              Register
            </Button>
            </GridItem>
            {error && (
              <GridItem colSpan={[1, 4]}>
                <Text color="red">{error}</Text>
              </GridItem>
            )}
          <GridItem colSpan={[1, 4]} my="30px">
            <Text display="flex">If you have an account, please <ChakraLink color="green" as={RouterLink} to="/login" mx="5px">login</ChakraLink>.</Text>
          </GridItem>
        </Grid>                
      </Box>
    )}
  </Formik>
  )
}
