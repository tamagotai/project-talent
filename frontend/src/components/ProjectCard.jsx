import { 
  Text, Card, CardHeader, Heading, 
  CardBody, CardFooter, Button 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProjectCard = ({project}) => {
  console.log(project);
  return (
    
    <Card key={project.id}>
        <CardHeader>
            <Heading size='md'>{project.project_name}</Heading>
        </CardHeader>
        <CardBody>
            <Text>{project.description}</Text>
        </CardBody>
        <CardFooter>
            <Button as={Link} to={`/dashboard/projects/${project.id}`}>View</Button>
        </CardFooter>
    </Card>
    
  )
}

export default ProjectCard
