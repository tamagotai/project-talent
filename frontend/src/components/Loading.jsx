import { Spinner, Box, Flex, Text } from '@chakra-ui/react';

const Loading = () => (
  <Flex height="100vh" alignItems="center" justifyContent="center" flexDirection="column">
    <Spinner size="xl" speed="0.65s" color="green.500" />
    <Box mt={4}>
      <Text fontSize="lg" fontWeight="medium">
        Loading...
      </Text>
    </Box>
  </Flex>
);

export default Loading;