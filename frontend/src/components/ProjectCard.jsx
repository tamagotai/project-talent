import { 
  Text, Card, CardHeader, Heading, 
  CardBody, CardFooter, Button, Badge 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProjectCard = ({project, industries}) => {
  console.log("Industries:", industries);
  return (
    
    <Card key={project.id}>
        <CardHeader>
            <Heading size='lg' color="#91818A">{project.project_name}</Heading>
            {industries?.map(industry => (
                <Badge key={industry.id} colorScheme="green" size='xl' mr="5px" my="5px">{industry.name}</Badge>
            ))}
            
        </CardHeader>
        <CardBody>
            <Text fontSize="lg">{project.description}</Text>
            <Text color="gray">organised by {project.organiser_firstname} {project.organiser_lastname}</Text>
        </CardBody>
        <CardFooter>
            <Button as={Link} to={`/dashboard/projects/${project.id}`}>View</Button>
        </CardFooter>
    </Card>
    
  )
}

export default ProjectCard
