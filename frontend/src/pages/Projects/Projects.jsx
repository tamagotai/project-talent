import { useState, useEffect } from "react";
import useProject from "../../hooks/useProject";
import Header from "../../components/Header";
import { Box, SimpleGrid, Input, Text} from "@chakra-ui/react";
import { ProjectCard } from "../../components/ProjectCard";
import search from "../../utils/SearchUtility";
import Loading from "../../components/Loading";

const Projects = () => {
  const [query, setQuery] = useState("");
  const {data, loading, error, getAllProjects} = useProject(query);
  const flattenIndustries = (project) => {
      return {
          ...project,
          industriesString: project.industries.map(industry => industry.name).join(', ')
      };
  };
  const flattenedProjects = data.map(flattenIndustries);
  const projectKeys = ["project_name", "description", "start_date", "end_date", "organiser_firstname", "organiser_lastname", "industriesString"];
  const filteredProjects = search(flattenedProjects, query, projectKeys);

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
        getAllProjects();
    }
  }, [query]);

  if(loading) return <Loading />;
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Project" subtitle="View all projects" />
      </Box>

      {/* BREADCRUMB */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      
      </Box>

      {/* SEARCH BOX */}
      <Box display="flex" justifyContent="flex-start" w={{base: "100%", md: "50%"}} alignItems="center">
        <Box
          display="flex"
          borderRadius="3px"
        >
          <Input 
            placeholder="Search..." 
            onChange={e => setQuery(e.target.value)}
          />
        </Box>
      </Box>

      {/* CARDS */}
      <SimpleGrid 
        spacing={10} 
        templateColumns='repeat(auto-fill, minmax(400px, 1fr))'
        m={50}
      >
        {filteredProjects.map(project => <ProjectCard key={project.id} project={project} industries={project.industries}/>)}

        {error && (
          <Text 
            fontSize="2em"
            as="b" 
            color="red"
            textAlign="center"
          >{error.message}</Text>)}
      </SimpleGrid>

    </Box>
  )
}

export default Projects
