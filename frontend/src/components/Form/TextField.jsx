import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const TextField = ({ label, ...props }) => {
const [field, meta] = useField(props);
return (
    <FormControl isInvalid={meta.error && meta.touched} variant="floating">
    <Input {...field} {...props} placeholder=" " />
    <FormLabel>{label}</FormLabel>
    <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
);
};

export default TextField;