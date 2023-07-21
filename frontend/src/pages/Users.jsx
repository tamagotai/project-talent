import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Users = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Users" subtitle="Find the users" />
      </Box>

    </Box>
  )
}

export default Users