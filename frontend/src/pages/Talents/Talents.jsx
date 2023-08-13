import { useState, useEffect } from "react";
import useTalent from "../../hooks/useTalent";
import {TalentCard} from "../../components/TalentCard";
import search from "../../utils/SearchUtility";
import Header from "../../components/Header";
import { Box, Input, SimpleGrid, Text} from "@chakra-ui/react";
import Loading from "../../components/Loading";

const Talents = () => {
  const [query, setQuery] = useState("");
  const {data, loading, error, getAllTalents} = useTalent(query);
  const flattenSkills = (talent) => {
    return {
        ...talent,
        skillsString: talent.skills.map(skill => skill.skill_name).join(', ')
    };
  };
  const flattenedTalents = data.map(flattenSkills);
  const talentKeys = ["firstname", "lastname", "email", "skillsString"];
  const filteredTalents = search(flattenedTalents, query, talentKeys);

  console.log("talentdata:", data)
  
  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
        getAllTalents();
    }
  }, [query]);

  if(loading) return <Loading />;
  console.log("talents:", data)
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
        spacing={10} 
        templateColumns='repeat(auto-fill, minmax(400px, 1fr))'
        m={50}
      >
        {filteredTalents.map(talent => <TalentCard key={talent.id} user={talent} skills={talent.skills} />)}

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

export default Talents