import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../../hooks/useProject";
import useSkill from "../../hooks/useSkill";
import Header from "../../components/Header";
import { TalentDetailsCard } from "../../components/TalentCard";
import { Box, Heading, Text, SimpleGrid, Grid, GridItem, Badge, Divider } from "@chakra-ui/react";
import Loading from "../../components/Loading";


const ProjectDetails = () => {
    const { id } = useParams();
    const { data: projectData, loading: projectLoading, error: projectError, getProjectById } = useProject();
    const { allSkills, userSkills, loading: skillsLoading, error: skillsError, getAllSkills, getUserSkills } = useSkill();
    
    console.log("projectData:", projectData)


    useEffect(() => {
        getProjectById(id);
    }, [id]);

    if(projectLoading) return <Loading />;
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
                <Heading color="#91818A">{projectData.project_name}</Heading>
                
                <Badge colorScheme="green">xxx</Badge>
            </GridItem>
            <GridItem colSpan={[1, 4]} textAlign="left" mt="5px">
                <Text as="b" color="gray.500" fontSize="xl">Skills</Text>
            </GridItem>
            
            {userSkills.length >0 ? (
                
                    <GridItem colSpan={[1, 4]}> 
                        <SimpleGrid
                            spacing={5} 
                            templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
                        >
                            {userSkills.map(skill =><TalentDetailsCard key={skill.id} skill={skill}/>)}
                        </SimpleGrid>
                    </GridItem>
    
            ) : (
                <GridItem colSpan={[1, 4]} textAlign="left" mt="5px">
                    <Text color="#2C3A2F">This talent is a newbie, he/she is working hard on developing his/her skills. Stay tune.</Text>
                </GridItem>
            )}
            
        </Grid>
     
        {/* ERROR MSG */}
        {(skillsError || projectError) && (
          <Text 
            fontSize="2em"
            as="b" 
            color="red"
            textAlign="center"
          >
            {skillsError ? skillsError.message : projectError.message}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default ProjectDetails;