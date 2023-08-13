import { Link } from "react-router-dom";
import { 
    Text, Card, CardHeader, Heading, 
    CardBody, CardFooter, Button, Badge 
} from "@chakra-ui/react";

const UserCard = ({ user }) => {
      
  return (           
    <Card key={user.id}>
        <CardHeader>
            <Heading size='md'>{user.firstname} {user.lastname}</Heading>
            <Badge colorScheme="green">{user.role_name}</Badge>
        </CardHeader>
        <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
            <Button as={Link} to={`/dashboard/users/${user.id}`}>View</Button>
        </CardFooter>
    </Card>      
  )  
}

export default UserCard
