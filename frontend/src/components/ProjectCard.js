import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const ProjectCard = (users) => {
  return (
    
    <Card key={user.id}>
        <CardHeader>
            <Heading size='md'>{user.lastname} {user.firstname}</Heading>
        </CardHeader>
        <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
            <Button>View</Button>
        </CardFooter>
    </Card>
    
  )
}

export default ProjectCard
