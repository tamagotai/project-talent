import { 
  Text, Card, CardHeader, Heading, 
  CardBody, CardFooter, Button, Badge 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProjectCard = ({project}) => {
  console.log(project);
  return (
    
    <Card key={project.id}>
        <CardHeader>
            <Heading size='lg'>{project.project_name}</Heading>
            <Text color="green">{project.industry_names}</Text>
            
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
