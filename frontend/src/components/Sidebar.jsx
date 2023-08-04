import { 
  Box, Center, Icon, Text, Link as ChakraLink, 
  useDisclosure, IconButton, Drawer, DrawerOverlay,
  DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton 
} from "@chakra-ui/react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { 
  MdOutlineHandshake, MdOutlineDashboard, 
  MdOutlinePerson, MdOutlineWorkOutline, MdOutlineStarRate 
} from "react-icons/md"
import { BsPersonWorkspace } from "react-icons/bs";
import { IoAppsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import { SidebarStyles } from "../theme/components/SidebarStyles";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Box as="nav">
                <ChakraLink as={RouterLink} to="/dashboard" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={MdOutlineDashboard} sx={SidebarStyles.variants.menuIcon} />
                    Dashboard
                </ChakraLink>
                <Box>
                  <Text sx={SidebarStyles.variants.menuLink}>
                    <Icon as={IoAppsOutline} sx={SidebarStyles.variants.menuIcon} />
                    Maketplace
                  </Text>
                  <Box pl={5}>
                    <ChakraLink as={RouterLink} to="/talents" sx={SidebarStyles.variants.menuLink}>
                      <Icon as={BsPersonWorkspace} sx={SidebarStyles.variants.menuIcon} />
                      Talents
                    </ChakraLink>
                    <ChakraLink as={RouterLink} to="/vacancies" sx={SidebarStyles.variants.menuLink}>
                      <Icon as={MdOutlineWorkOutline} sx={SidebarStyles.variants.menuIcon} />
                      Vacancies
                    </ChakraLink>
                  </Box>
                </Box>
                <ChakraLink as={RouterLink} to="/users" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={LuUsers} sx={SidebarStyles.variants.menuIcon} />
                    Users
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/rate" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={MdOutlineStarRate} sx={SidebarStyles.variants.menuIcon} />
                    Rating
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/profile" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={MdOutlinePerson} sx={SidebarStyles.variants.menuIcon} />
                    Profile
                </ChakraLink>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* NonMOBILE SIZE MENU */}
      <Box as="aside" sx={SidebarStyles.baseStyle}>
        {/* WEBSITE LOGO */}
        <Center h="50px">
          <Text fontSize={20} fontWeight={700}>P<Icon as={MdOutlineHandshake} />T</Text>
        </Center>
        <Box as="nav">
          <ChakraLink as={RouterLink} to="/dashboard" sx={SidebarStyles.variants.menuLink}>
              <Icon as={MdOutlineDashboard} sx={SidebarStyles.variants.menuIcon} />
              Dashboard
          </ChakraLink>
          <Box>
            <Text sx={SidebarStyles.variants.menuLink}>
              <Icon as={IoAppsOutline} sx={SidebarStyles.variants.menuIcon} />
              Maketplace
            </Text>
            <Box pl={5}>
              <ChakraLink as={RouterLink} to="/talents" sx={SidebarStyles.variants.menuLink}>
                <Icon as={BsPersonWorkspace} sx={SidebarStyles.variants.menuIcon} />
                Talents
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/vacancies" sx={SidebarStyles.variants.menuLink}>
                <Icon as={MdOutlineWorkOutline} sx={SidebarStyles.variants.menuIcon} />
                Vacancies
              </ChakraLink>
            </Box>
          </Box>
          <ChakraLink as={RouterLink} to="/users" sx={SidebarStyles.variants.menuLink}>
              <Icon as={LuUsers} sx={SidebarStyles.variants.menuIcon} />
              Users
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/rate" sx={SidebarStyles.variants.menuLink}>
              <Icon as={MdOutlineStarRate} sx={SidebarStyles.variants.menuIcon} />
              Rating
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/profile" sx={SidebarStyles.variants.menuLink}>
              <Icon as={MdOutlinePerson} sx={SidebarStyles.variants.menuIcon} />
              Profile
          </ChakraLink>
        </Box>
      </Box>
    </>
  )
}

export default Sidebar