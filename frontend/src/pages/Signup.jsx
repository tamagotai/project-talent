import { 
  Text, Button, Box,
  Grid, Link, useMediaQuery 
} from '@chakra-ui/react';
import { Formik } from "formik";
import { useSignup } from '../hooks/useSignup';
import { UserSchema } from '../Validations/UserValidation';
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
      validationSchema={UserSchema}
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
      <Box as="form" onSubmit={formik.handleSubmit} maxW="xl" alignContent="center" mx="auto">
        <Text fontSize="xl" fontWeight="bold">Register</Text>
        <Grid
          templateColumns="repeat(4, minmax(0, 1fr)"
          gap="30px"
          mx="auto"
          maxW={{base: "100%", md: 500 , xl: 600}}
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        > 
          <RadioInput
            label="Select your role"
            name="role"
            options={[
              { label: 'Talent', value: '2' },
              { label: 'Project Organiser', value: '3' },
            ]}
          />       
          <TextField label="Username" name="username" placeholder="Username" />
          <TextField label="Firstname" name="firstname" placeholder="Firstname" />
          <TextField label="Lastname" name="lastname" placeholder="Lastname" />
          <TextField label="Email" name="email" placeholder="Email" />
          <TextField label="Mobile" type="tel" name="mobile" placeholder="Mobile" />
          <TextField label="Landline" type="tel" name="landline" placeholder="Landline" />
          <TextField label="Password" type="password" name="password" placeholder="Password" />
          <TextField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm password" />
        </Grid>
          <Button
            colorScheme="green"
            fontWeight="bold"
            mt="4"
            type="submit"
            disabled={isLoading}
          >
            Register
          </Button>
          {error && <Text>{error}</Text>}        
        <Text display="flex">If you have an account, please <Link href="/login" mx="2px"> login </Link>.</Text>
      </Box>
    )}
  </Formik>
  )
}
