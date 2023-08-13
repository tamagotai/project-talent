import { useState, useEffect } from "react";
import useVacancy from "../hooks/useVacancy";
import Header from "../components/Header";
import { Box, SimpleGrid, Input, Text } from "@chakra-ui/react";
import VacancyCard from "../components/VacancyCard";
import search from "../utils/SearchUtility";
import Loading from "../components/Loading";

const Vacancies = () => {
  const [query, setQuery] = useState("");
  const {data, loading, error, getAllVacancies} = useVacancy(query);
  const vacancyKeys = ["vacancy_name", "description", "related_project", "skills_required", "hourly_wage"];
  const filteredVacancies = search(data, query, vacancyKeys);
  console.log("Vacancy data:", data)

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
      getAllVacancies();
    }
  }, [query]);

  if(loading) return <Loading />;

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="VACANCIES" subtitle="Find your position" />
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
        {filteredVacancies.map(vacancy => <VacancyCard key={vacancy.id} vacancy={vacancy}/>)}

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

export default Vacancies