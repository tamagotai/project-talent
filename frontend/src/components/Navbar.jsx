import { Box, IconButton, Input, Text, Icon, Link } from "@chakra-ui/react";
import { 
  MdOutlineHandshake, 
  MdSettings,
  MdOutlineSearch,
  MdOutlineNotifications,
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineLogin
 } from "react-icons/md";
 import useAuth from "../hooks/useAuth";

const Navbar = () => {
  // const theme = useTheme()
  const { user, logout } = useAuth();
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      
      {user? ( //show search bar, notification, setting, profile and logout buttons when login status
      <>
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
          <IconButton aria-label="Notification" icon={<MdOutlineNotifications />} />
          <IconButton aria-label="Setting" icon={<MdSettings />} />
          <IconButton aria-label="Profile" icon={<MdPersonOutline />} />
          <IconButton
            onClick={() => logout()} // Call the logout function when the logout button is clicked
            aria-label="Logout"
            icon={<MdOutlineLogout />}
          />
        </Box>
      </>
  ) : (
    // When user is not logged in
    <>
    {/* WEBSITE LOGO */}
    <Box h="50px">
      <Text fontSize={20} fontWeight={700}>P<Icon as={MdOutlineHandshake} />T</Text>
    </Box>
    <Box justifyContent="center" display="flex" gap={2}>
      <Link href="/login" mt={2}>Login</Link>
      <Link href="/signup" mt={2}>Signup</Link>
      <IconButton
        as="a"
        href="/login"
        aria-label="Login"
        icon={<MdOutlineLogin />}
      />
    </Box>
    </>
  )}
</Box>
);
}

export default Navbar;