import { 
    Text, Card, CardHeader, Heading, 
    CardBody, CardFooter, Button, Badge 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TalentCard = ({ user, skills }) => {

  return (           
    <Card key={user.id}>
        <CardHeader>
            <Heading size='md'>{user.firstname} {user.lastname}</Heading>
        </CardHeader>
        <CardBody>
            {skills?.map(skill => (
                <Badge key={skill.skill_id} colorScheme="green" size='xl' mr="5px" my="5px">{skill.skill_name}</Badge>
            ))}
            
        </CardBody>
        <CardFooter>
            <Button as={Link} to={`/dashboard/talents/${user.id}`}>View</Button>
        </CardFooter>
    </Card>      
  )  
};

export const TalentDetailsCard =  ({ skill} ) => {

    return (
        
        <Card key={skill.id}>
        <CardHeader>
            <Heading size='md' height="40px">{skill.skill_name}</Heading>
        </CardHeader>
        <CardBody>
            <Heading size='sm' color="green.800">{skill.experience_years} years experience</Heading>
            <Text>${skill.hourly_wage}</Text>
        </CardBody>
        <CardFooter>
            <Button>Interest</Button>
        </CardFooter>
    </Card> 

    )
};
