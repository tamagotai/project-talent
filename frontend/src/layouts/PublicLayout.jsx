import Navbar from "../components/Navbar"
import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

export const PublicLayout = () => {
  return (
    <Box display="flex" position="relative">
        <main className="content">
        <Navbar />
            <Outlet />
        </main>
    </Box>
  )
}