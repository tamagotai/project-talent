import { Center, Icon, Text } from "@chakra-ui/react";
import { MdOutlineHandshake, MdOutlineDashboard, MdOutlinePerson, MdOutlineWorkOutline} from "react-icons/md"
import { HiOutlineChatAlt }from "react-icons/hi";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoAppsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

const CustomSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar width="200px" rootStyles={{background: "#F2F2C9"}}>
      {/* WEBSITE LOGO */}
      <Center h="50px">
        <Text fontSize={20} fontWeight={700}>P<Icon as={MdOutlineHandshake} />T</Text>
      </Center>

        <Menu>
            <MenuItem
              title="Dashbaord"
              icon={<MdOutlineDashboard />}
              as="a"
              href="/"
            >
              Dashboard
            </MenuItem>
            <SubMenu label="Maketplace"
              title="Maketplace"
              icon={<IoAppsOutline />}
              to="/search"
            >
              <MenuItem 
                title="Talents"
                icon={<BsPersonWorkspace />}
                as="a"
                href="/talents"
              >Talents
              </MenuItem>
              <MenuItem
                title="Vacancies"
                icon={<MdOutlineWorkOutline />}
                as="a"
                href="/vacancies"
              >Vacancies
              </MenuItem>
            </SubMenu>
            <MenuItem
              title="Users"
              icon={<LuUsers />}
              as="a"
              href="/users"
            >
              Users
            </MenuItem>
            <MenuItem
              title="Chat"
              icon={<HiOutlineChatAlt />}
              as="a"
              href="/chat"
            >
              Chatroom
            </MenuItem>
            <MenuItem
              title="Profile"
              icon={<MdOutlinePerson />}
              as="a"
              href="/profile"
            >
              Profile
            </MenuItem>
        </Menu>
    </Sidebar>
  )
}

export default CustomSidebar