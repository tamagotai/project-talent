import useAuth from "../../hooks/useAuth";
import { 
  Box, Center, 
  useDisclosure, IconButton, Drawer, DrawerOverlay,
  DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton 
} from "@chakra-ui/react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { SidebarStyles } from "../../theme/components/SidebarStyles";
import { Logo } from "../Logo";
import { Sidebar, Menu } from "react-pro-sidebar";
import { sidebarItems, SidebarItem } from "./SidebarItem";

const CustomSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const ROLES = {
    'Admin': 1,
    'Talent': 2,
    'Organiser': 3,
  }

  return (
    <>
      {/* MOBILE SIZE MENU */}
      <IconButton
        aria-label="Open menu"
        icon={<AiOutlineMenuUnfold />}
        onClick={onOpen}
        display={{ base: "block", md: "none" }}      
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay>
          <DrawerContent sx={SidebarStyles.baseStyle}>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Sidebar width="200px" rootStyles={{background: "#F2F2C9"}}>
              <Menu
                menuItemStyles={{
                  button: ({ active }) => {
                    return {
                      backgroundColor: active ? '#AEEFC8' : undefined,
                    };
                  },
                }}
              >
                {sidebarItems
                  ?.filter(item => {
                    if (item.title === "Users" && user.role_id !== ROLES.Admin) {
                      return false;  // Exclude the "Users" menu for non-admin users
                    }
                    return true;  // Include other menu items
                  })
                  .map(item => <SidebarItem key={item.title} {...item} />)}
                </Menu>
              </Sidebar>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* NonMOBILE SIZE MENU */}
      <Box as="aside" sx={SidebarStyles.baseStyle} display={{ base: "none", md: "block" }}>
        {/* WEBSITE LOGO */}
        <Center h="50px"><Logo /></Center>
        <Sidebar width="200px" rootStyles={{background: "#F2F2C9"}}>
          <Menu
            menuItemStyles={{
              button: ({ active }) => {
                return {
                  backgroundColor: active ? '#AEEFC8' : undefined,
                };
              },
            }}
          >
            {sidebarItems
              ?.filter(item => {
                if (item.title === "Users" && user.role_id !== ROLES.Admin) {
                  return false;  // Exclude the "Users" menu for non-admin users
                }
                return true;  // Include other menu items
              })
              .map(item => <SidebarItem key={item.title} {...item} />)}
          </Menu>
        </Sidebar>
      </Box>
    </>
  )
}

export default CustomSidebar