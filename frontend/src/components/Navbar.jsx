import { useNavigate, Link, useLocation } from "react-router-dom";
import { 
  Box, IconButton, Input, 
  Flex, Avatar, AvatarBadge,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider 
} from "@chakra-ui/react";
import { 
  MdSettings,
  MdOutlineSearch,
  MdOutlineDashboard,
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineLogin
 } from "react-icons/md";
 import { Logo } from "./Logo";
 import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); //get current location

  const handleLogout = () => {
    logout();
    navigate("/") // Navigate to homepage after logout
  };

  const isPrivateRoute = location.pathname.startsWith('/dashboard');

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      
      {user? ( 
        //login status: show avatar, dashbaord and logout icons
      <>
      {/* SEARCH BAR */}
        {/* <Box
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
        </Box> */}
        
        {/* Logo shows in public routes */}
        {!isPrivateRoute && <Flex justifyContent="flex-start" w="full" align="center">
          <Logo />
        </Flex>}

        {/* LEFT ICONS */}
        <Flex justifyContent="flex-end" w="full" align="center">
          
          {!isPrivateRoute && <Link to="/dashboard">
            <IconButton         
              aria-label="Dashboard" 
              icon={<MdOutlineDashboard />} 
              fontSize="24px" 
              variant="unstyled"
            />
          </Link>}

          <Menu>
            <MenuButton>
              <Avatar size="sm" mr="10px" bg="green.200" name={`${user.firstname} ${user.lastname}`}>
                <AvatarBadge boxSize="1.25em" bg="green.800" />
              </Avatar>              
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => { /* Handle Profile Navigation */ }}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => { /* Handle Settings Navigation */ }}>
                Settings
              </MenuItem>
              <MenuItem onClick={() => { /* Handle Notifications Navigation */ }}>
                Notifications
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </>
  ) : (
    // When user is not logged in
    <>
      {/* WEBSITE LOGO */}
      <Logo />
      <Box justifyContent="center" display="flex" gap={10}>
        <Link to="/login" m="20px">Login</Link>      
      </Box>
    </>
  )}
</Box>
);
}

export default Navbar;