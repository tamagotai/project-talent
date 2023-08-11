import { Text, Box } from "@chakra-ui/react"

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
        <Text
            fontSize="1.5em"
            color="green.500"
            fontWeight="500"
            sx={{m: "0 0 5px 0"}}
        >
            {title}
        </Text>
        <Text
            fontSize="1em"
            color="gray.600"
        >
            {subtitle}
        </Text>

        
    </Box>
  )
}

export default Header