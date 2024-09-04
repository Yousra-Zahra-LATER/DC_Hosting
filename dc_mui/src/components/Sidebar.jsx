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
import { MdOutlineVpnLock } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { SiOpenaccess } from "react-icons/si";
import { GoTasklist } from "react-icons/go";
import { MdOutlineWeb } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";
import { FaServer } from "react-icons/fa";
import { BsHouseAddFill } from "react-icons/bs";
import { FaCloud } from "react-icons/fa";
import { SiOpenstack } from "react-icons/si";
import { MdBackup } from "react-icons/md";
import { AiOutlineCloudServer } from "react-icons/ai";
import { MdDns } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { LuDatabaseBackup } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
export default function Sidebar() {
  const drawerWidth = 85;
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState("DataCenterADMIN");
  const [openItems, setOpenItems] = useState({});
  const [activeTitle, setActiveTitle] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState(null);

  const menuItems = [
    {
      text: "Task Manager",
      icon: <MdOutlineAddTask />,
      id: "tasks",
      path: "/taskspath",
    },
    {
      text: "DataCenter ADMIN",
      icon: <GiServerRack />,
      id: "DataCenterADMIN",
      path: "/",
    },
    {
      text: "Cloud ADMIN",
      icon: <FaSoundcloud />,
      id: "Cloud",
      path: "/clouddashboard",
    },

    { text: "Support", icon: <BiSupport />, id: "support", path: "/support" },
    {
      text: "User Manager",
      icon: <FaUsersLine />,
      id: "user_manager",
      path: "/user-manager",
    },
    {
      text: "Account",
      icon: <RiAccountPinCircleFill />,
      id: "account",
      path: "/profile",
    },
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
          title: "Datacenter Manager",
          icon: <LuServerCog />,
          subItems: [
            { title: "SITE", icon: <BackupIcon />, path: "/datacenter" },
            { title: "RACK", icon: <ScriptIcon />, path: "/rack" },
            { title: "SERVER", icon: <BackupIcon />, path: "/server" },
            { title: "ROUTER", icon: <ScriptIcon />, path: "/router" },
            { title: "SWITCH", icon: <BackupIcon />, path: "/switch" },
            { title: "FIREWALL", icon: <ScriptIcon />, path: "/firewall" },
            { title: "SAN", icon: <BackupIcon />, path: "/san" },
            { title: "LS", icon: <ScriptIcon />, path: "/ls" },
            { title: "PDU", icon: <ScriptIcon />, path: "/pdu" },
          ],
        },
        {
          title: "Virtualisation Manager",
          icon: <GrVirtualMachine />,
          subItems: [
            { title: "VM", icon: <BackupIcon />, path: "/vm" },
            { title: "CLUSTER", icon: <ScriptIcon />, path: "/cluster" },
            { title: "vAPP", icon: <ScriptIcon />, path: "/cluster" },
            { title: "SFTP", icon: <ScriptIcon />, path: "/cluster" },
          ],
        },
        {
          title: "Access MANAGER",
          icon: <SiOpenaccess />,
          subItems: [
            { title: "INTERNET Access", icon: <BackupIcon />, path: "/vm" },
            { title: "ERP Access ", icon: <ScriptIcon />, path: "/cluster" },
            { title: "HR  Access", icon: <ScriptIcon />, path: "/cluster" },
            { title: "PAM  Access", icon: <ScriptIcon />, path: "/cluster" },
          ],
        },
        {
          title: "IPAM Manager",
          icon: <BiNetworkChart />,
          subItems: [
            { title: "VLAN", icon: <BackupIcon />, path: "/ip" },
            { title: "NETWORK", icon: <ScriptIcon />, path: "/rangeip" },
            { title: "VRF", icon: <BackupIcon />, path: "/ip" },
            { title: "IP", icon: <ScriptIcon />, path: "/rangeip" },
            { title: "BGP", icon: <ScriptIcon />, path: "/ip" },
          ],
        },
        {
          title: "VPN Manager",
          icon: <MdOutlineVpnLock />,
          subItems: [
            { title: "VPN TUNNEL", icon: <BackupIcon />, path: "/ip" },
            { title: "VPN CLIENT", icon: <ScriptIcon />, path: "/rangeip" },
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
          title: "Web Hosting",
          icon: <MdOutlineWeb />,
          subItems: [],
          path: "/clouddashboard",
        },
        {
          title: "Business Email",
          icon: <MdMarkEmailUnread />,
          subItems: [],
          path: "/supportmanager",
        },
        {
          title: "VPS Server",
          icon: <VscVmActive />,
          subItems: [
            {
              title: "VPS Standard",
              subItems: [],
              path: "/vps/standard",
            },
            {
              title: "VPS Performance",

              subItems: [],
              path: "/vps/performance",
            },
            {
              title: "VPS Storage",

              subItems: [],
              path: "/vps",
            },

            {
              title: "VPS HCI",

              subItems: [],
              path: "/vps",
            },
          ],
        },
        {
          title: "Dedicated Server",
          icon: <FaServer />,
          subItems: [],
          path: "/supportmanager",
        },
        {
          title: "Server Housing",
          icon: <BsHouseAddFill />,
          subItems: [],
          path: "/supportmanager",
        },
        {
          title: "OpenStack Cloud",
          icon: <SiOpenstack />,
          subItems: [],
          path: "/supportmanager",
        },

        {
          title: "Hosted Private Cloud",
          icon: <FaCloud />,
          subItems: [],
          path: "/supportmanager",
        },

        {
          title: "Cloud Backup",
          icon: <MdBackup />,
          subItems: [],
          path: "/supportmanager",
        },

        {
          title: "Cloud Storage",
          icon: <AiOutlineCloudServer />,
          subItems: [],
          path: "/supportmanager",
        },
        {
          title: "Backup As service",
          icon: <LuDatabaseBackup />,
          subItems: [],
          path: "/supportmanager",
        },

        {
          title: "DNS",
          icon: <MdDns />,
          subItems: [],
          path: "/supportmanager",
        },
        {
          title: "Support Manager",
          icon: <MdOutlineContactSupport />,
          subItems: [],
          path: "/supportmanager",
        },
      ],
    },

    tasks: {
      bigTitle: "Task Manager",

      items: [
        {
          title: "TASKs",
          icon: <GoTasklist />,
          subItems: [
            { title: "NEW  TASK", icon: <BackupIcon />, path: "/ip" },
            { title: "MY TASKS", icon: <BackupIcon />, path: "/ip" },
            { title: "TEAM TASKS", icon: <ScriptIcon />, path: "/rangeip" },
            { title: "TASKS PENDING", icon: <BackupIcon />, path: "/ip" },
            { title: "TASKS OPEN", icon: <ScriptIcon />, path: "/rangeip" },
            { title: "TASKS ISSUE", icon: <ScriptIcon />, path: "/ip" },
            { title: "TASKS COMPLETE", icon: <ScriptIcon />, path: "/ip" },
          ],
          path: "/path1",
        },
        {
          title: "TASKs TEAM ",
          icon: <RiTeamFill />,
          subItems: [
            { title: "TASK TEAM", icon: <BackupIcon />, path: "/ip" },
            { title: "TASK MEMBERS", icon: <ScriptIcon />, path: "/rangeip" },
          ],
          path: "/path2",
        },

        {
          title: "TASK HISTORY ",
          icon: <FaHistory />,
          subItems: [
            { title: "TASKS HISTORY", icon: <BackupIcon />, path: "/ip" },
            { title: "MEMBERS TASK'S", icon: <ScriptIcon />, path: "/rangeip" },
          ],
          path: "/path3",
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
    support: {
      bigTitle: "Support",
      items: [
        {
          title: "item1",
          icon: <NetworkIcon />,
          subItems: [],
          path: "/support/item1",
        },
        {
          title: "item2",
          icon: <NetworkIcon />,
          subItems: [],
          path: "/support/item2",
        },
        {
          title: "item3",
          icon: <NetworkIcon />,
          subItems: [],
          path: "/support/item3",
        },
      ],
    },
    user_manager: {
      bigTitle: "User Manager",
      items: [
        {
          title: "item1",
          icon: <NetworkIcon />,
          subItems: [],
          path: "/user-manager/item1",
        },
        {
          title: "item2",
          icon: <NetworkIcon />,
          subItems: [],
          path: "/user-manager/item2",
        },
        {
          title: "item3",
          icon: <NetworkIcon />,
          subItems: [],
          path: "/user-manager/item3",
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
    // Initialisation: dÃ©finir le premier Ã©lÃ©ment de la section active comme actif et le routage appropriÃ©
    const defaultItem = menuContent[activeItem]?.items[0];
    if (
      defaultItem &&
      location.pathname === "/" &&
      !location.pathname.includes(defaultItem.path)
    ) {
      navigate(defaultItem.path); // Redirige vers le chemin du premier Ã©lÃ©ment si nÃ©cessaire
    }
  }, [activeItem, location.pathname, navigate]);

  const handleMenuClick = (id) => {
    setActiveItem(id);
    const defaultItem = menuContent[id]?.items[0];
    setActiveTitle(defaultItem?.title || null); // DÃ©finit le premier Ã©lÃ©ment comme actif
    setOpenItems({}); // Ferme tous les Ã©lÃ©ments
    if (defaultItem) {
      navigate(defaultItem.path); // Redirige vers le chemin du premier Ã©lÃ©ment de la section
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
          overflowY: "auto", // Activer le défilement vertical
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
