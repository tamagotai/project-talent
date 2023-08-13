import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  FormControl, FormErrorMessage, FormLabel, Input,
  InputGroup, InputRightElement, InputLeftAddon,
  NumberInput, NumberInputField, IconButton, Select,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const NormalTextField = ({ label, type, options, ...props }) => {
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
    case 'wage':
    const wageFormat = (val) => `$${val}`;
    const wageParse = (val) => val.replace(/^\$/, '');
    inputField = (
        <NumberInput
        {...field}
        onChange={(valueString) => field.onChange(field.name)(wageParse(valueString))}
        value={wageFormat(field.value)}
        precision={2}
        step={0.5}
        >
        <NumberInputField {...props} />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
        </NumberInput>
    );
    break;
    case 'experience':
        const experienceFormat = (val) => `${val}`;
        const experienceParse = (val) => val.replace(/[^\d.]/g, ''); // Removing non-numeric characters
        inputField = (
            <InputGroup display="flex">
                <NumberInput
                    flex="1"
                    {...field}
                    onChange={(valueString) => field.onChange(field.name)(experienceParse(valueString))}
                    value={experienceFormat(field.value)}
                    precision={1}
                    step={0.5}
                >
                    <NumberInputField {...props} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <InputLeftAddon children="Years" bg="transparent" borderLeft="none" />
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
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel style={labelStyle}>{label}</FormLabel>
      {inputField}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default NormalTextField;
