import { 
MdOutlineDashboard, MdOutlineNotificationsNone,
MdOutlineWorkOutline, MdOutlineStarRate 
} from "react-icons/md"
import { BsPersonWorkspace } from "react-icons/bs";
import { IoAppsOutline } from "react-icons/io5";
import { LuUsers, LuUser } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

export const sidebarItems = [
    {
        title: "Dashboard",
        icon: <MdOutlineDashboard />,
        to: "/dashboard"
    },
    {
        label: "Maketplace",
        title: "Maketplace",
        icon: <IoAppsOutline />,
        subMenu: [
        { 
            title: "Talents", 
            icon: <BsPersonWorkspace />, 
            to: "/dashboard/talents" 
        },
        { 
            title: "Vacancies", 
            icon: <MdOutlineWorkOutline />, 
            to: "/dashboard/vacancies" 
        },
        ]
    },
    {
        title: "Rating",
        icon: <MdOutlineStarRate />,
        to: "/dashboard/rate"
    },
    {
        title: "Profile",
        icon: <LuUser />,
        to: "/dashboard/profile"
    },
    {
        title: "Settings",
        icon: <AiOutlineSetting />,
        to: "/dashboard/settings"
    },
    {
        title: "Notifications",
        icon: <MdOutlineNotificationsNone />,
        to: "/dashboard/notifications"
    },
    {
        title: "Users",
        icon: <LuUsers />,
        to: "/dashboard/users"
    },    
];

export const SidebarItem = (item) => {
    const location = useLocation();
    const isActive = location.pathname === item.to;

    if (item.subMenu) {
        return (
            <SubMenu key={item.title} label={item.label} title={item.title} icon={item.icon}>
                {item.subMenu.map(subItem => <SidebarItem key={subItem.title} {...subItem} />)}
            </SubMenu>
        );
    }

    return (        
        <MenuItem
            key={item.title}
            title={item.title} 
            icon={item.icon}
            active={isActive}
            component={<Link to={item.to} />}
        >
            {item.title}
        </MenuItem>
    );
};