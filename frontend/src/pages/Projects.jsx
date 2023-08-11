import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Box, SimpleGrid, Input} from "@chakra-ui/react";
import axios from "../api/axios";
import { MdOutlineSearch } from "react-icons/md";
import UserCard from "../components/UserCard";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await axios.get('/users');
  //     setData(res.data);
  //   };
  //   if (query.length ===0 || query.length > 2) fetchUsers()
  // },[query]);

  // const keys = ["firstname", "lastname", "email"]
  // const search = (data) => {
  //   return data.filter((item) => 
  //     keys.some((key) => item[key].toLowerCase90.includes(query))
  // )};

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Project" subtitle="View your Project" />
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
            sx={{ ml: 2, flex: 1 }} 
            placeholder="Search..." 
            onChange={e => setQuery(e.target.value)}
          />
          {/* <IconButton 
            type="button" 
            sx={{ p: 1 }}
            aria-label="Search"
            icon={<MdOutlineSearch />}
            variant="unstyled"            
          /> */}
        </Box>
      </Box>

      {/* CARDS */}
      <SimpleGrid 
        spacing={4} 
        templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
      >
        {<UserCard data={data} />}
      </SimpleGrid>

    </Box>
  )
}

export default Projects
