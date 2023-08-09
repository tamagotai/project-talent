import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Vacancies = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="VACANCIES" subtitle="Find your position" />
      </Box>

    </Box>
  )
}

export default Vacancies