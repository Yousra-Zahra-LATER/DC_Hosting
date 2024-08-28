import React, { useState, useEffect } from "react";
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
import NetworkIcon from "@mui/icons-material/SettingsEthernet";
import BackupIcon from "@mui/icons-material/Backup";
import ScriptIcon from "@mui/icons-material/Code";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import logo from "../assets/Logo.png";
import { FaUsersLine } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { TbCloudCog } from "react-icons/tb";
import { FaSoundcloud } from "react-icons/fa";
import { GiServerRack } from "react-icons/gi";
import { PiUserCircleGear } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiCreditCard } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuServerCog } from "react-icons/lu";
import { GrVirtualMachine } from "react-icons/gr";
import { BiNetworkChart } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {  useLocation, useNavigate } from "react-router-dom";
export default function Sidebar() {
  const drawerWidth = 85;
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState("DataCenterADMIN");
  const [openItems, setOpenItems] = useState({});
  const [activeTitle, setActiveTitle] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState(null);

  const menuItems = [
    { text: "DataCenter ADMIN", icon: <GiServerRack />, id: "DataCenterADMIN",path:"/"},
   
    { text: "Account", icon: <RiAccountPinCircleFill />, id: "account",path:"/profile" },


  ];

  const menuContent = {
    DataCenterADMIN: {
      bigTitle: "Data Center ADMIN",
      items: [
        {
          title: "Dashboard admin",
          icon: <LuLayoutDashboard />,
          subItems: [],
          path: "/",
        },
        {
          title: "Device Manager",
          icon: <LuServerCog />,
          subItems: [
            { title: "Server", icon: <BackupIcon />, path: "/server" },
            { title: "Router", icon: <ScriptIcon />, path: "/router" },
            { title: "Switch", icon: <BackupIcon />, path: "/switch" },
            { title: "Firewall", icon: <ScriptIcon />, path: "/firewall" },
          ],
        },
        {
          title: "Virtualisation Manager",
          icon: <GrVirtualMachine />,
          subItems: [
            { title: "VM", icon: <BackupIcon />, path: "/vm" },
            { title: "CLUSTER", icon: <ScriptIcon />, path: "/cluster" },
          ],
        },
        {
          title: "Ipam Manager",
          icon: <BiNetworkChart />,
          subItems: [
            { title: "IP", icon: <BackupIcon />, path: "/ip" },
            { title: "Range IP", icon: <ScriptIcon />, path: "/rangeip" },
          ],
        },
      ],
    },
    Cloud: {
      bigTitle: "Cloud ADMIN",
      items: [
        {
          title: "Dashboard admin",
          icon: <LuLayoutDashboard />,
          subItems: [],
          path: "/clouddashboard",
        },
        {
          title: "Support Manager",
          icon: <MdOutlineContactSupport />,
          subItems: [],
          path: "/supportmanager",
        },
        {
          title: "Tasks Manager",
          icon: <MdOutlineAddTask />,
          subItems: [],
          path: "/tasksmanager",
        },
        {
          title: "Cloud Service Manager",
          icon: <TbCloudCog />,
          subItems: [],
          path: "/cloudservicemanager",
        },
      ],
    },
    account: {
      bigTitle: "My Account",
      items: [
        {
          title: "Profile",
          icon: <PiUserCircleGear />,
          subItems: [],
          path: "/profile",
        },
        {
          title: "Authentication",
          icon: <RiLockPasswordLine />,
          subItems: [],
          path: "/auth",
        },
        {
          title: "Make Payment",
          icon: <PiCreditCard />,
          subItems: [],
          path: "/payment",
        },
      ],
    },
  };



  const handleToggle = (title) => {
    setActiveTitle(title);
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialisation: définir le premier élément de la section active comme actif et le routage approprié
    const defaultItem = menuContent[activeItem]?.items[0];
    if (defaultItem && location.pathname === "/" && !location.pathname.includes(defaultItem.path)) {
      navigate(defaultItem.path); // Redirige vers le chemin du premier élément si nécessaire
    }
  }, [activeItem, location.pathname, navigate]);

  const handleMenuClick = (id) => {
    setActiveItem(id);
    const defaultItem = menuContent[id]?.items[0];
    setActiveTitle(defaultItem?.title || null); // Définit le premier élément comme actif
    setOpenItems({}); // Ferme tous les éléments
    if (defaultItem) {
      navigate(defaultItem.path); // Redirige vers le chemin du premier élément de la section
    }
  };

  
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
              component={Link}
              to={item.path}
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
                  activeItem === item.id
                    ? "#1E293A"
                    : hoveredItem === item.id
                    ? ""
                    : "",
                color: "transparent",
                transition:
                  "border-right 0.3s ease, background-color 0.3s ease",
              }}
            >
              <ListItemIcon
                style={{
                  justifyContent: "center",
                  color: "white",
                  marginBottom: "5px",
                  fontSize: "23px",
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
              component={Link}
              to={item.path}
                button
                onClick={() => {
                  handleToggle(item.title);
                }}
                onMouseEnter={() => setHoveredTitle(item.title)}
                onMouseLeave={() => setHoveredTitle(null)}
                sx={{
                  padding: "4px 14px",
                  minHeight: "40px",
                  backgroundColor:
                    activeTitle === item.title || hoveredTitle === item.title
                      ? "#E8EEF7"
                      : "transparent",
                  color: activeTitle === item.title ? "#0061f2" : "inherit",
                }}
              >
                <ListItemIcon sx={{ minWidth: "38px", fontSize: "23px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ fontSize: "13px" }}
                  sx={{ color: hoveredTitle === item.title ? "#0061f2" : "" }}
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
                        component={Link}
                        to={subItem.path}
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
