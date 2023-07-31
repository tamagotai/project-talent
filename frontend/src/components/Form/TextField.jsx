import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const TextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  let inputField;

  const labelStyle = type === "tel" ? { paddingLeft: "50px" } : {};

  switch (type) {
    case 'password':
      inputField = (
        <InputGroup size="md">
          <Field as={Input} {...field} {...props} type={showPassword ? 'text' : 'password'} placeholder=" " />
          <InputRightElement>
            <IconButton 
              aria-label={showPassword ? 'Hide password' : 'Show password'} 
              icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              onClick={handlePasswordVisibility}
            />
          </InputRightElement>
        </InputGroup>
      );
      break;
    default:
      inputField = <Field as={Input} {...field} {...props} placeholder=" " />;
  }

  return (
    <FormControl isInvalid={meta.error && meta.touched} variant="floating">
      {inputField}
      <FormLabel>{label}</FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
