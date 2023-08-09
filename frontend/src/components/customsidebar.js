return (
    <Sidebar width="200px" rootStyles={{background: "#F2F2C9"}}>
      <Menu>
        <MenuItem
          label="Dashboard" 
          title="Dashboard"
          icon={<MdOutlineDashboard />}
          as={RouterLink}
          to="/dashboard"
        />
        <SubMenu 
          label="Maketplace"
          title="Maketplace"
          icon={<IoAppsOutline />}
        >
          <MenuItem
          label="Talents" 
          title="Talents"
          icon={<BsPersonWorkspace />}
          as={RouterLink}
          to="/dashboard/talents"
          />
          <MenuItem
          label="Vacancies" 
          title="Vacancies"
          icon={<MdOutlineWorkOutline />}
          as={RouterLink}
          to="/dashboard/vacancies"
          />
        </SubMenu>
        <MenuItem
          label="Rating" 
          title="Rating"
          icon={<MdOutlineStarRate />}
          as={RouterLink}
          to="/dashboard/rate"
        />
        <MenuItem
          label="Profile" 
          title="Profile"
          icon={<MdOutlineWorkOutline />}
          as={RouterLink}
          to="/dashboard/profile"
        />
        <MenuItem
          label="Settings" 
          title="Settings"
          icon={<AiOutlineSetting />}
          as={RouterLink}
          to="/dashboard"
        />
        <MenuItem
          label="Notification" 
          title="Notification"
          icon={<MdOutlineNotificationsNone />}
          as={RouterLink}
          to="/dashboard"
        />
      </Menu>
    </Sidebar>
  )