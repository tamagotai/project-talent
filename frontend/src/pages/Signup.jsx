import { 
  Text, Button, Box, GridItem,
  Grid, Link, useMediaQuery 
} from '@chakra-ui/react';
import { Formik } from "formik";
import { useSignup } from '../hooks/useSignup';
import { SignupSchema } from '../Validations/UserValidation';
import TextField from '../components/Form/TextField';
import RadioInput from '../components/Form/RadioInput';

export default function Signup() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
        })
        .catch((err) => {
          console.log("Signup error:", err); // Log any error
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
              <Text fontSize="xl" fontWeight="bold" my="30px">Sign Up</Text>
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1}>
            <RadioInput
              label="Select your role"
              name="role"
              options={[
                { label: 'Talent', value: '2' },
                { label: 'Project Organiser', value: '3' },
              ]}
            />
          </GridItem>       
          <GridItem colSpan={isNonMobile ? 4 : 1}>
            <TextField label="Username" name="username" placeholder="Username" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 2 : 1}>         
            <TextField label="Firstname" name="firstname" placeholder="Firstname" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 2 : 1}> 
          <TextField label="Lastname" name="lastname" placeholder="Lastname" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1}>       
            <TextField label="Email" name="email" placeholder="Email" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 2 : 1}>
            <TextField label="Mobile" type="tel" name="mobile" placeholder="Mobile" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 2 : 1}>
            <TextField label="Landline" type="tel" name="landline" placeholder="Landline" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1}>
            <TextField label="Password" type="password" name="password" placeholder="Password" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1}>
            <TextField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm password" />
          </GridItem>
          <GridItem colSpan={isNonMobile ? 4 : 1} justifyContent="center" display="flex">
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
              <GridItem colSpan={isNonMobile ? 4 : 1}>
                <Text>{error}</Text>
              </GridItem>
            )}
          <GridItem colSpan={isNonMobile ? 4 : 1} my="30px">
            <Text display="flex">If you have an account, please <Link href="/login" mx="5px"> login </Link>.</Text>
          </GridItem>
        </Grid>                
      </Box>
    )}
  </Formik>
  )
}
