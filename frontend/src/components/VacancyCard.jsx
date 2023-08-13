import { 
    Text, Card, CardHeader, Heading, 
    CardBody, CardFooter, Button, Badge 
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  
  const VacancyCard = ({ vacancy }) => {
    return (
      <Card key={vacancy.id}>
          <CardHeader>
              <Heading size='lg' color="#91818A">{vacancy.vacancy_name}</Heading>
              <Text fontSize="lg">{vacancy.related_project}</Text>
              {vacancy.skills_required?.map(skill => (
                  <Badge key={skill.id} colorScheme="blue" size='xl' mr="5px" my="5px">{skill.name}</Badge>
              ))}
          </CardHeader>
          <CardBody>
              <Text fontSize="lg">{vacancy.description}</Text>
              <Text fontSize="md" color="green">${vacancy.hourly_wage}/hr</Text>
          </CardBody>
          <CardFooter>
              <Button as={Link} to={`/dashboard/vacancies/${vacancy.id}`}>View</Button>
          </CardFooter>
      </Card>
    )
  }
  
  export default VacancyCard;
  