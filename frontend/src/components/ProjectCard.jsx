import { 
  Text, Card, CardHeader, Heading, 
  CardBody, CardFooter, Button 
} from "@chakra-ui/react";

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
            <Button>View</Button>
        </CardFooter>
    </Card>
    
  )
}

export default ProjectCard
