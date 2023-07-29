import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    RadioGroup,
    Stack,
    Radio,
  } from "@chakra-ui/react";
  import { useField } from "formik";
  
  const RadioInput = ({ label, options, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
  
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup {...field} onChange={(val) => setValue(val)}>
          <Stack direction="row">
            {options.map((option, index) => (
              <Radio key={index} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default RadioInput;