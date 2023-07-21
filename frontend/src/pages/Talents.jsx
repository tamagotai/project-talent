import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Talents = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TALENTS" subtitle="Find your team" />
      </Box>
      {/* END HEADER */}
      

    </Box>
  )
}

export default Talents