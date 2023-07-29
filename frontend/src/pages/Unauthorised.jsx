import { useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import { Box, Button } from "@chakra-ui/react";

const Unauthorised = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Unauthorised" subtitle="" />
        </Box>
        <Button onClick={goBack}>Go Back</Button>
  
      </Box>
    )
  }
  
  export default Unauthorised