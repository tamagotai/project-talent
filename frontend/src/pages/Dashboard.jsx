import { Box } from "@chakra-ui/react";
import Header from "../components/Header";

const Dashboard= () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome back" />
      </Box>

    </Box>
  )
}

export default Dashboard