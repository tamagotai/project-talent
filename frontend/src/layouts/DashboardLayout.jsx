import CustomSidebar from "../components/Sidebar.js/Sidebar"
import Navbar from "../components/Navbar"
import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

export const DashboardLayout = () => {
  return (
    <Box display="flex" position="relative">
        <CustomSidebar />
        
        {/* <main className="content">{children}</main> */}
        <main className="content">
        <Navbar />
          <Outlet />
        </main>
    </Box>
  )
}
