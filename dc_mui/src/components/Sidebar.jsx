import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
  Typography,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleIcon from "@mui/icons-material/People";
import SupportIcon from "@mui/icons-material/Support";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NetworkIcon from "@mui/icons-material/SettingsEthernet";
import BackupIcon from "@mui/icons-material/Backup";
import ScriptIcon from "@mui/icons-material/Code";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import logo from "../assets/Logo.png";

export default function Sidebar() {
  const drawerWidth = 85;
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState("DataCenterADMIN");
  const [openItems, setOpenItems] = useState({});

  const menuItems = [
    { text: "DataCenter ADMIN", icon: <StorageIcon />, id: "DataCenterADMIN" },
    { text: "Cloud ADMIN", icon: <PeopleIcon />, id: "Cloud" },
    { text: "Support", icon: <SupportIcon />, id: "support" },
    { text: "User Manager", icon: <AccountCircleIcon />, id: "user_manager" },
    { text: "Account", icon: <AccountCircleIcon />, id: "account" },
    
  ];

  const menuContent = {
    DataCenterADMIN: {
      bigTitle: "Data Center ADMIN",
      items: [
        {
          title: "Dashboard admin",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Device Manager",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Virtualisation Manager",
          icon: <NetworkIcon />,
          subItems:  [
          { title: "VM", icon: <BackupIcon /> },
          { title: "CLUSTER", icon: <ScriptIcon /> },]
        },
        {
          title: "Ipam Manager",
          icon: <NetworkIcon />,
          subItems: [
            { title: "IP", icon: <BackupIcon /> },
            { title: "Range IP", icon: <ScriptIcon /> },
          ],
        },
      ],
    },
    Cloud: {
      bigTitle: "Cloud ADMIN",
      items: [
        {
          title: "Dashboard admin",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Support Manager",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Tasks Manager",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Cloud Service Manager",
          icon: <NetworkIcon />,
          subItems: [],
        },
      ],
    },
    account: {
      bigTitle: "My Account",
      items: [
        {
          title: "Profile",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Authentication",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Make Payement",
          icon: <NetworkIcon />,
          subItems: [],
        },
        
      ],
    },
    support: {
      bigTitle: "Support",
      items: [
        {
          title: "Profile",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Authentication",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Make Payement",
          icon: <NetworkIcon />,
          subItems: [],
        },
        
      ],
    },
    user_manager: {
      bigTitle: "Support",
      items: [
        {
          title: "Profile",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Authentication",
          icon: <NetworkIcon />,
          subItems: [],
        },
        {
          title: "Make Payement",
          icon: <NetworkIcon />,
          subItems: [],
        },
        
      ],
    },

  };

  const handleMenuClick = (id) => {
    setActiveItem(id);
    setOpenItems({});
  };

  const handleItemClick = (title) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Premier panneau latéral */}
      <Drawer
        variant="permanent"
        style={{
          width: drawerWidth,
          backgroundColor: "#0b0d24",
          color: "white",
          flexShrink: 0,
          height: "100vh",
        }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: "#0b0d24",
            color: "white",
          },
        }}
      >
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "80%",
              height: "auto",
              maxWidth: "70px",
            }}
          />
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              button
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuClick(item.id)}
              style={{
                flexDirection: "column",
                padding: "10px 0",
                borderRight:
                  activeItem === item.id || hoveredItem === item.id
                    ? "6px solid #8bbdfc"
                    : "6px solid transparent",
                backgroundColor:
                  activeItem === item.id ? "#1E293A" : hoveredItem === item.id ? "" : "",
                color: "transparent",
                transition: "border-right 0.3s ease, background-color 0.3s ease",
              }}
            >
              <ListItemIcon
                style={{
                  justifyContent: "center",
                  color: "white",
                  marginBottom: "5px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                style={{
                  textAlign: "center",
                  color: hoveredItem === item.id ? "#8bbdfc" : "white",
                  fontSize: "12px",
                }}
                primaryTypographyProps={{ style: { fontSize: "11px" } }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenu du panneau latéral à droite */}
      <Box
        sx={{
          width: 220,
          backgroundColor: "#F9FAFB",
          border: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            height: 55,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            paddingLeft: "14px",
            marginBottom: "12px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Typography>{menuContent[activeItem].bigTitle}</Typography>
        </Box>
        <List component="nav">
          {menuContent[activeItem].items.map((item) => (
            <React.Fragment key={item.title}>
              <ListItem
                button
                onClick={() => handleItemClick(item.title)}
                sx={{ padding: "4px 14px", minHeight: "40px" }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
                {item.subItems.length > 0 &&
                  (openItems[item.title] ? (
                    <ExpandLess sx={{ fontSize: "16px" }} />
                  ) : (
                    <ExpandMore sx={{ fontSize: "16px" }} />
                  ))}
              </ListItem>

              {item.subItems.length > 0 && (
                <Collapse
                  in={openItems[item.title]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        button
                        key={subItem.title}
                        sx={{ padding: "4px 8px", pl: "55px" }}
                      >
                        <ListItemText
                          primary={subItem.title}
                          primaryTypographyProps={{
                            fontSize: "12px",
                            color: "grey",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}
