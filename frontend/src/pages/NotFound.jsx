import Header from "../components/Header";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Page NotFound" subtitle="" />
      </Box>
        <Button onClick={goBack}>Go back</Button>
    </Box>
  )
}

export default NotFound