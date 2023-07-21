import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const Chat = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CHATROOM" subtitle="Talk with someone" />
      </Box>

    </Box>
  )
}

export default Chat