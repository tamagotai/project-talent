import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Notification = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="NOTIFICATION" subtitle="You may miss something" />
      </Box>
      {/* END HEADER */}
      

    </Box>
  )
}

export default Notification