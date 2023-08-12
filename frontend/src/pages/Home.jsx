import Header from "../components/Header"
import { Box } from "@chakra-ui/react"

export default function Home() {

    

    return (
      <Box m="20px">
      {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="HOME" subtitle="Welcome home" />
        </Box>
      </Box>
  )
}
