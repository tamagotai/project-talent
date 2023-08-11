import { useState } from "react";
import useUser from "../hooks/useUser";
import Header from "../components/Header";
import { Box, SimpleGrid, Input } from "@chakra-ui/react";
import UserCard from "../components/UserCard";
import search from "../utils/SearchUtility";

const Users = () => {  
  const [query, setQuery] = useState("");
  const data = useUser(query);
  const userKeys = ["firstname", "lastname", "email", "role_name"];
  const filteredUsers = search(data, query, userKeys);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Users" subtitle="Find the users" />
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
        {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
      </SimpleGrid>
    </Box>   
  )
}

export default Users