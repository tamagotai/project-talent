import { 
  Text, Card, CardHeader, Heading, 
  CardBody, CardFooter, Button, Badge 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const ProjectCard = ({project, industries}) => {
  console.log("Industries:", industries);

  //update date format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

  return (
    
    <Card key={project.id}>
        <CardHeader>
            <Heading size='lg' color="#91818A">{project.project_name}</Heading>
            {industries?.map(industry => (
                <Badge key={industry.id} colorScheme="green" size='xl' mr="5px" my="5px">{industry.name}</Badge>
            ))}
            
        </CardHeader>
        <CardBody>
            <Text fontSize="xl">{project.description}</Text>
            <Text color="gray.700" mt="30px">
              Period: {formatDate(project.start_date)} - {formatDate(project.end_date)}
            </Text>
            <Text color="gray">organised by {project.organiser_firstname} {project.organiser_lastname}</Text>
        </CardBody>
        <CardFooter>
            <Button as={Link} to={`/dashboard/projects/${project.id}`}>View</Button>
        </CardFooter>
    </Card>
    
  )
}

export const VacancyInProjectCard = ({ vacancy }) => {
  return (
    <Card key={vacancy.id}>
        <CardHeader>
            <Heading size='md' color="#91818A">{vacancy.name}</Heading>
        </CardHeader>
        <CardBody>
            <Text fontSize="md">{vacancy.description}</Text>
            <Text fontSize="sm" color="green">${vacancy.hourly_wage}/hr</Text>
        </CardBody>
        <CardFooter>
            <Button as={Link} to={`/dashboard/vacancies/${vacancy.id}`}>View</Button>
        </CardFooter>
    </Card>
  )
}
