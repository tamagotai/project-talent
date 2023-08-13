import { Text, Flex, Icon } from '@chakra-ui/react';
import { MdOutlineHandshake } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Flex as={Link} to="/" height="flex" width="200px" alignItems="center" justifyContent="center">
        <Text fontSize="20px" fontWeight="700">P</Text>
        <Icon as={MdOutlineHandshake} boxSize="20px" ml={1} mr={1} />
        <Text fontSize="20px" fontWeight="700">T</Text>
    </Flex>
  )
}
