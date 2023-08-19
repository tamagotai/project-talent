import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import Header from "../../components/Header";
import { Box, SimpleGrid, Input, Text } from "@chakra-ui/react";
import UserCard from "../../components/UserCard";
import search from "../../utils/SearchUtility";
import Loading from "../../components/Loading";

const Users = () => {  
  const [query, setQuery] = useState("");
  const {data, loading, error, getAllUsers} = useUser(query);
  const userKeys = ["firstname", "lastname", "email", "role_name"];
  const filteredUsers = search(data, query, userKeys);

  useEffect(() => {
    if ((query.length === 0) || (query.length > 2)) {
        getAllUsers();
    }
  }, [query]);

  if(loading) return <Loading />;
  console.log("filteredUsers:", filteredUsers)
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
        spacing={10} 
        templateColumns='repeat(auto-fill, minmax(400px, 1fr))'
        m={50}
      >
        {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
        
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

export default Users