import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Settings = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SETTINGS" subtitle="Update your preferences" />
      </Box>
      {/* END HEADER */}
      

    </Box>
  )
}

export default Settings