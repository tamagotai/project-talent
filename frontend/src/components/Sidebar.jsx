import { 
  Box, Center, Icon, Text, Link as ChakraLink, 
  useDisclosure, IconButton, Drawer, DrawerOverlay,
  DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton,
  Accordion, AccordionButton, AccordionIcon, AccordionPanel,
  AccordionItem 
} from "@chakra-ui/react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { 
  MdOutlineDashboard, MdOutlinePerson, 
  MdOutlineWorkOutline, MdOutlineStarRate 
} from "react-icons/md"
import { BsPersonWorkspace } from "react-icons/bs";
import { IoAppsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import { SidebarStyles } from "../theme/components/SidebarStyles";
import { Logo } from "./Logo";

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
                <Box as={Accordion} defaultIndex={[1]} allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Text sx={SidebarStyles.variants.menuLink}>
                        <Icon as={IoAppsOutline} sx={SidebarStyles.variants.menuIcon} />
                        Maketplace
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Box pl={5}>
                        <ChakraLink as={RouterLink} to="/dashboard/talents" sx={SidebarStyles.variants.menuLink}>
                          <Icon as={BsPersonWorkspace} sx={SidebarStyles.variants.menuIcon} />
                          Talents
                        </ChakraLink>
                        <ChakraLink as={RouterLink} to="/dashboard/vacancies" sx={SidebarStyles.variants.menuLink}>
                          <Icon as={MdOutlineWorkOutline} sx={SidebarStyles.variants.menuIcon} />
                          Vacancies
                        </ChakraLink>                  
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Box>
                <ChakraLink as={RouterLink} to="/dashboard/users" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={LuUsers} sx={SidebarStyles.variants.menuIcon} />
                    Users
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/dashboard/rate" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={MdOutlineStarRate} sx={SidebarStyles.variants.menuIcon} />
                    Rating
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/dashboard/profile" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={MdOutlinePerson} sx={SidebarStyles.variants.menuIcon} />
                    Profile
                </ChakraLink>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* NonMOBILE SIZE MENU */}
      <Box as="aside" sx={SidebarStyles.baseStyle} display={{ base: "none", md: "block" }}>
        {/* WEBSITE LOGO */}
        <Center h="50px"><Logo /></Center>
        <Box as="nav">
          <ChakraLink as={RouterLink} to="/dashboard" sx={SidebarStyles.variants.menuLink}>
              <Icon as={MdOutlineDashboard} sx={SidebarStyles.variants.menuIcon} />
              Dashboard
          </ChakraLink>
          <Box as={Accordion} defaultIndex={[1]} allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Text sx={SidebarStyles.variants.menuLink}>
                  <Icon as={IoAppsOutline} sx={SidebarStyles.variants.menuIcon} />
                  Maketplace
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Box pl={5}>
                  <ChakraLink as={RouterLink} to="/dashboard/talents" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={BsPersonWorkspace} sx={SidebarStyles.variants.menuIcon} />
                    Talents
                  </ChakraLink>
                  <ChakraLink as={RouterLink} to="/dashboard/vacancies" sx={SidebarStyles.variants.menuLink}>
                    <Icon as={MdOutlineWorkOutline} sx={SidebarStyles.variants.menuIcon} />
                    Vacancies
                  </ChakraLink>                  
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Box>
          <ChakraLink as={RouterLink} to="/dashboard/users" sx={SidebarStyles.variants.menuLink}>
              <Icon as={LuUsers} sx={SidebarStyles.variants.menuIcon} />
              Users
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/dashboard/rate" sx={SidebarStyles.variants.menuLink}>
              <Icon as={MdOutlineStarRate} sx={SidebarStyles.variants.menuIcon} />
              Rating
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/dashboard/profile" sx={SidebarStyles.variants.menuLink}>
              <Icon as={MdOutlinePerson} sx={SidebarStyles.variants.menuIcon} />
              Profile
          </ChakraLink>
        </Box>
      </Box>
    </>
  )
}

export default Sidebar