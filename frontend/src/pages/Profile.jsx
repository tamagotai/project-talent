import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROFILE" subtitle="View your profile" />
      </Box>

    </Box>
  )
}

export default Profile