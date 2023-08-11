import { useState } from "react";
import useTalent from "../hooks/useTalent";
import TalentCard from "../components/TalentCard";
import search from "../utils/SearchUtility";
import Header from "../components/Header";
import { Box, Input, SimpleGrid} from "@chakra-ui/react";

const Talents = () => {
  const [query, setQuery] = useState("");
  const data = useTalent(query);
  const talentKeys = ["firstname", "lastname", "email", "skill_name"];
  const filteredTalents = search(data, query, talentKeys);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TALENTS" subtitle="Find your team" />
      </Box>
      
      {/* BREADCRUMB */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        
      </Box>

      {/* SEARCH BOX */}
      <Box display="flex" justifyContent="flex-start" w={{base: "100%", md: "80%"}} alignItems="center">
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
        {filteredTalents.map(talent => <TalentCard key={talent.id} user={talent} />)}
      </SimpleGrid>
    </Box>   
  )
}

export default Talents