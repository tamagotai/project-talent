import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const FloatTextField = ({ label, type, options, ...props }) => {
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
              variant="none" 
              aria-label={showPassword ? 'Hide password' : 'Show password'} 
              icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              onClick={handlePasswordVisibility}
            />
          </InputRightElement>
        </InputGroup>
      );
      break;
    case 'select':
      inputField = (
        <Field as={Select} {...field} {...props}>
          <option value="" label="Select option" disabled hidden />
          {options.map((option, index) => (
            <option key={index} value={option.value} label={option.label} />
          ))}
        </Field>
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

export default FloatTextField;
