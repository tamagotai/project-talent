import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useVacancy from "../../hooks/useVacancy";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Box, Heading, Text, SimpleGrid, Grid, GridItem, Badge, Button } from "@chakra-ui/react";
import Loading from "../../components/Loading";


const VacancyDetails = () => {
    const { id } = useParams();
    const { data, loading, error, getVacancyById } = useVacancy();
    
    //update date format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    console.log("Vacancy Data:", data)


    useEffect(() => {
        getVacancyById(id);
    }, [id]);

    if(loading) return <Loading />;
  return (
    <Box m="20px">
        {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header  title="Vacancy details" subtitle="" />
      </Box>

      <Box background="white" display="flex" flexDirection="column" maxW={{ base: "100%", md: 800, xl: 1000 }}>
        <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
            gap="30px"
            mx="auto"
            m="20px"
        >
            <GridItem colSpan={[1, 4]} textAlign="left" mt="20px">
                <Heading color="#91818A">{data.vacancy_name}</Heading>                
            </GridItem>
            <GridItem colSpan={[1, 4]} textAlign="left" mt="5px">
                <Text as="b" color="gray.500" fontSize="xl">Details</Text>
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="5px">
                <Text ml="20px" as="b" fontSize="md">Description</Text>
            </GridItem>
            <GridItem colSpan={[1, 3]} textAlign="left" mt="5px">
                <Text fontSize="md">{data.description}</Text>
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="5px">
                <Text ml="20px" as="b" fontSize="md">Project</Text>
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="5px">
                <Text as={Link} to={`/dashboard/projects/${data.project_id}`} color="green.700" fontSize="md">{data.project_name}</Text>
            </GridItem>
            <GridItem colSpan={[1, 2]} textAlign="left">
                <Button size="sm" as={Link} to={`/dashboard/projects/${data.project_id}`}>View</Button>
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="0px">
                <Text ml="20px" as="b" fontSize="md">Project period</Text>
            </GridItem>
            <GridItem colSpan={[1, 3]} textAlign="left" mt="0px">
                <Text fontSize="md">{formatDate(data.start_date)} - {formatDate(data.end_date)}</Text>
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="5px">
                <Text ml="20px" as="b" fontSize="md">Skills requirement</Text>
            </GridItem>
            <GridItem colSpan={[1, 3]} textAlign="left" mt="5px">
                {data.skills?.map((skill, index) => (
                    <Badge key={index} colorScheme="green" size='xl' mr="5px" my="5px">{skill.name}</Badge>
                ))}
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="5px">
                <Text ml="20px" as="b" fontSize="md">Industry</Text>
            </GridItem>
            <GridItem colSpan={[1, 3]} textAlign="left" mt="5px">
                {data.industries?.map((industry, index) => (
                    <Badge key={index} colorScheme="green" size='xl' mr="5px" my="5px">{industry.name}</Badge>
                ))}
            </GridItem>
        <Button mt="30px">Interest</Button>
            
        </Grid>
        
        {/* ERROR MSG */}
        {error && (
          <Text 
            fontSize="2em"
            as="b" 
            color="red"
            textAlign="center"
          >
            {error.message}
          </Text>
        )}  
      </Box>
      
    </Box>
  )
}

export default VacancyDetails;