import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Rate = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Rating" subtitle="Provide your feedback" />
      </Box>

    </Box>
  )
}

export default Rate