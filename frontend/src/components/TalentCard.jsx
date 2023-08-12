import { 
    Text, Card, CardHeader, Heading, 
    CardBody, CardFooter, Button 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TalentCard = ({ user }) => {

  return (   
        
    <Card key={user.id}>
        <CardHeader>
            <Heading size='md'>{user.firstname} {user.lastname}</Heading>
        </CardHeader>
        <CardBody>
            <Heading size='sm'>{user.role_name}</Heading>
            <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
            <Button as={Link} to={`/dashboard/users/${user.id}`}>View</Button>
        </CardFooter>
    </Card>      
  )  
}

export default TalentCard
