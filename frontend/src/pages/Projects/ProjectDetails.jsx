import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../../hooks/useProject";
import Header from "../../components/Header";
import { VacancyInProjectCard } from "../../components/ProjectCard";
import { Box, Heading, Text, SimpleGrid, Grid, GridItem, Badge, Divider } from "@chakra-ui/react";
import Loading from "../../components/Loading";


const ProjectDetails = () => {
    const { id } = useParams();
    const { data, loading, error, getProjectById } = useProject();
    
    //update date format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    console.log("projectData:", data)


    useEffect(() => {
        getProjectById(id);
    }, [id]);

    if(loading) return <Loading />;
  return (
    <Box m="20px">
        {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header  title="Project details" subtitle="" />
      </Box>

      <Box background="white" display="flex" flexDirection="column" maxW={{ base: "100%", md: 800, xl: 1000 }}>
        <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
            gap="30px"
            mx="auto"
            m="20px"
        >
            <GridItem colSpan={[1, 4]} textAlign="left" mt="20px">
                <Heading color="#91818A">{data.project_name}</Heading>                
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
                <Text ml="20px" as="b" fontSize="md">Period</Text>
            </GridItem>
            <GridItem colSpan={[1, 3]} textAlign="left" mt="5px">
                <Text fontSize="md">{formatDate(data.start_date)} - {formatDate(data.end_date)}</Text>
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="5px">
                <Text ml="20px" as="b" fontSize="md">Industry</Text>
            </GridItem>
            <GridItem colSpan={[1, 3]} textAlign="left" mt="5px">
                {data.industries?.map(industry => (
                    <Badge key={industry.id} colorScheme="green" size='xl' mr="5px" my="5px">{industry.name}</Badge>
                ))}
            </GridItem>
            <GridItem colSpan={[1, 1]} textAlign="left" mt="5px">
                <Text ml="20px" as="b" fontSize="md">Organiser</Text>
            </GridItem>
            <GridItem colSpan={[1, 3]} textAlign="left" mt="5px">
                <Text fontSize="md">{data.organiser_firstname} {data.organiser_lastname}</Text>
            </GridItem>
            <GridItem colSpan={[1, 4]} textAlign="left" mt="20px">
                <Divider />
            </GridItem>
            <GridItem colSpan={[1, 4]} textAlign="left" mt="20px">
                <Text as="b" color="gray.500" fontSize="xl">Vacancy available</Text>
            </GridItem>
            
            {data.vacancies?.length >0 ? (
                
                <GridItem colSpan={[1, 4]}> 
                    <SimpleGrid
                        spacing={5} 
                        templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
                    >
                        {data.vacancies.map(vacancy =><VacancyInProjectCard key={vacancy.id} vacancy={vacancy}/>)}
                    </SimpleGrid>
                </GridItem>
    
            ) : (
                <GridItem colSpan={[1, 4]} textAlign="left" mt="5px">
                    <Text color="#2C3A2F">This project not require a role at this moment. Stay tune.</Text>
                </GridItem>
            )}
            
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

export default ProjectDetails;