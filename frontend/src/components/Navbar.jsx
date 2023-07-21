import { Box, IconButton, Input, useTheme } from "@chakra-ui/react";
import { MdSettings,MdOutlineSearch, MdOutlineNotifications, MdLightbulb, MdPersonOutline, MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  // const theme = useTheme()

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
      >
        <Input sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton 
          type="button" 
          sx={{ p: 1 }}
          aria-label="Search"
          icon={<MdOutlineSearch />}
          />
      </Box>

      {/* LEFT ICONS */}
      <Box display="flex">
        {/* <IconButton aria-label="lightmode" icon={<MdLightbulb />} />*/}
        <IconButton aria-label="Notification" icon={<MdOutlineNotifications />} />
        <IconButton aria-label="Setting" icon={<MdSettings />} />
        <IconButton aria-label="Profile" icon={<MdPersonOutline />} />
      </Box>
      
      <Box display="flex">
        {/* <IconButton aria-label="lightmode" icon={<MdLightbulb />} />*/}
        <IconButton
          as="a"
          href="/login"
          aria-label="Logout"
          icon={<MdOutlineLogout />}
        />
      </Box>

    </Box>
  )
}

export default Navbar