import { useState } from "react";
import useProject from "../hooks/useProject";
import Header from "../components/Header";
import { Box, SimpleGrid, Input} from "@chakra-ui/react";
import ProjectCard from "../components/ProjectCard";
import search from "../utils/SearchUtility";

const Projects = () => {
  const [query, setQuery] = useState("");
  const data = useProject(query);
  const projectKeys = ["project_name", "description", "project_organiser", "start_date", "end_date"];
  const filteredProjects = search(data, query, projectKeys);
  
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
        spacing={4} 
        templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
        mt={5}
      >
        {filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
      </SimpleGrid>

    </Box>
  )
}

export default Projects
