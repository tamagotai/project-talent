export const SidebarStyles = {
    baseStyle: {
      width: "200px",
      background: "#F4F4EB",
      color: "#333",
      height: "100vh"
    },
    variants: {
      menuLink: {
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
        transition: "background 0.2s",
        "&:hover": {
          background: "#FBFAF5",
        },
        "&.active": {
          background: "#cccc88",
          fontWeight: "bold",
        },
      },
      menuIcon: {
        marginRight: "10px",
      },
      menuLabel: {
        fontSize: "16px",
      },
    },
  };
  