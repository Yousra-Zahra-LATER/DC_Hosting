import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/Logo.png";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import PublicIcon from "@mui/icons-material/Public"; // Utilisé pour les plages d'adresse IP
import LocationCityIcon from "@mui/icons-material/LocationCity";
import GroupIcon from "@mui/icons-material/Group";
import ComputerIcon from "@mui/icons-material/Computer";
import MemoryIcon from "@mui/icons-material/Memory";
import RouterIcon from "@mui/icons-material/Router";
import ShieldIcon from "@mui/icons-material/Shield";
import StorageIcon from "@mui/icons-material/Storage";
import DevicesIcon from "@mui/icons-material/Devices";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const drawerWidth = 250;
const DrawerIconColor = '#1E2A5E';
const AppBarColor = '#F7F7F8';
const DrawerColor = '#55679C';
const ListItemColor = '#e3f2fd';
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: 'DrawerColor',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: AppBarColor, // Navbar background color
  color: '#ffffff', // Navbar text color

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: DrawerColor, // Sidebar background color
       // Sidebar text color
      fontFamily: 'Arial, sans-serif',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: DrawerColor, // Sidebar background color
      // Sidebar text color
    },
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false); // State for nested list

  const [ipamOpen, setIpamOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/Profile");
    handleClose();
  };

  const handleNestedClick1 = () => {
    setOpenD(!openD);
  };

 

  const handleNestedClick = () => {
    setNestedOpen(!nestedOpen);
  };

  const handleIpamClick = () => {
    setIpamOpen(!ipamOpen);
  };
  
  const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8], // Elevation level
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      boxShadow: theme.shadows[8], // Elevation on hover
    },
  }));

  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    fontFamily: 'Exo 2, sans-serif !important',
    fontWeight: 500, // Adjust as needed
  }));

  const CustomListItem = styled(ListItem)(({ theme }) => ({
    
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: ListItemColor , // Slightly darker blue for hover effect
      boxShadow: `0 6px 12px rgba(0, 0, 0, 0.2)`, // Darker shadow color on hover
    },
  }));
  
  return (
    <>

        <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "40px",
                
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
          >
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon sx={{ color : DrawerIconColor }} />
          </IconButton>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center"}}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={anchorEl ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfileClick}>
              <Avatar /> Profile
            </MenuItem>

            
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
          <img
              src={logo}
              alt="Logo"
              style={{
                width: "50px",
                marginRight: "8px",
                transition: "width 0.3s",
              }}/>
              <p>DC-Hosting</p>
          </IconButton>
        </DrawerHeader>

        
        <List>
          <CustomListItem disablePadding>
            <ListItemButton
             onClick={() => navigate('/')}
              sx={{
                maxHeight: 42,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  
                }}
              >
                <DashboardIcon sx={{ color: DrawerIconColor , fontSize: 18}} />
              </ListItemIcon>
              <CustomListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 , fontSize: 16, }}
              />
            </ListItemButton>
          </CustomListItem>

          <CustomListItem disablePadding>
            <ListItemButton
              onClick={() => navigate('/dc')}
              sx={{
                maxHeight: 42,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LocationCityIcon sx={{ color: DrawerIconColor ,fontSize: 18}} />
              </ListItemIcon>
              <CustomListItemText
                primary="Data Center"
                sx={{ opacity: open ? 1 : 0,fontSize: 20 }}
              />
            </ListItemButton>
          </CustomListItem>

          <CustomListItem disablePadding>
            <ListItemButton
              onClick={handleNestedClick1}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DevicesIcon sx={{ color: DrawerIconColor,fontSize: 18 }} />
              </ListItemIcon>

              <CustomListItemText primary="Devices" sx={{ opacity: open ? 1 : 0,fontSize: 18 }} />
              {open && <>{openD ? <ExpandLess /> : <ExpandMore />}</>}
            </ListItemButton>
          </CustomListItem>
          <Collapse in={openD} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/server')}>
                <ListItemIcon>
                  <StorageIcon sx={{ color: DrawerIconColor,fontSize: 18 }}/>
                </ListItemIcon>
                <CustomListItemText primary="Server" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/router')}>
                <ListItemIcon>
                  <RouterIcon sx={{ color: DrawerIconColor,fontSize: 18 }}/>
                </ListItemIcon>
                <CustomListItemText primary="Router" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/firewall')}>
                <ListItemIcon>
                  <ShieldIcon sx={{ color: DrawerIconColor,fontSize: 18 }}/>
                </ListItemIcon>
                <CustomListItemText primary="Firewall" />
              </ListItemButton>
            </List>
          </Collapse>
          
          <CustomListItem disablePadding>
          <ListItemButton onClick={handleNestedClick} sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
              <MemoryIcon sx={{ color: DrawerIconColor,fontSize: 18 }} />
            </ListItemIcon>
            <CustomListItemText primary="Virtualization" sx={{ opacity: open ? 1 : 0,fontSize: 18 }} />
            {open && <>{nestedOpen ? <ExpandLess /> : <ExpandMore />}</>}
          </ListItemButton>
          </CustomListItem>
          <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/vm')}>
                <ListItemIcon>
                  <ComputerIcon sx={{ color: DrawerIconColor,fontSize: 18 }}/>
                </ListItemIcon>
                <CustomListItemText primary="VM" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/cluster')}>
                <ListItemIcon>
                  <GroupIcon  sx={{ color: DrawerIconColor,fontSize: 18 }}/>
                </ListItemIcon>
                <CustomListItemText primary="Cluster" />
              </ListItemButton>
            </List>
          </Collapse>


          {!open ? (
            <Tooltip title="IPAM" placement="right">
             < CustomListItem disablePadding>
              <ListItemButton onClick={handleIpamClick}sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                  <NetworkCheckIcon sx={{ color: DrawerIconColor,fontSize: 18 }} />
                </ListItemIcon>
                <CustomListItemText primary="IPAM"  sx={{ opacity: open ? 1 : 0,fontSize: 18 }}/>
                {open && <>{ipamOpen ? <ExpandLess /> : <ExpandMore />}</>}
              </ListItemButton>
              </CustomListItem>
            </Tooltip>
          ) : (
            < CustomListItem disablePadding>
            <ListItemButton onClick={handleIpamClick}sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NetworkCheckIcon sx={{ color: DrawerIconColor,fontSize: 18 }} />
              </ListItemIcon>
              <CustomListItemText primary="IPAM"  sx={{ opacity: open ? 1 : 0,fontSize: 18 }}/>
              {open && <>{ipamOpen ? <ExpandLess /> : <ExpandMore />}</>}
            </ListItemButton>
            </CustomListItem>
          )}
          <Collapse in={ipamOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3.2 }} onClick={() => navigate('/ip')}>
                <ListItemIcon>
                  <NetworkCheckIcon  sx={{ color: DrawerIconColor,fontSize: 18 }} />
                </ListItemIcon>
                <CustomListItemText primary="Adresse IP" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3.2 }} onClick={() => navigate('/rip')}>
                <ListItemIcon>
                  <PublicIcon sx={{ color: DrawerIconColor,fontSize: 18 }}/>
                </ListItemIcon>
                <CustomListItemText primary="Plages d'adresse IP" />
              </ListItemButton>
            </List>
          </Collapse>

          <CustomListItem disablePadding>
            <ListItemButton
             onClick={() => navigate('/')}
              sx={{
                maxHeight: 42,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  
                }}
              >
                <PersonIcon sx={{ color: DrawerIconColor,fontSize: 18 }} />
              </ListItemIcon>
              <CustomListItemText
                primary="Client"
                sx={{ opacity: open ? 1 : 0,fontSize: 18 }}
              />
            </ListItemButton>
          </CustomListItem>

          <CustomListItem >
            <ListItemButton
             onClick={() => navigate('/profile')}
              sx={{
                maxHeight: 42,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  
                }}
              >
              <AccountCircleIcon sx={{ color: DrawerIconColor }} />
              </ListItemIcon>
              
          <CustomListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
              {open && <>{openD ? <ExpandLess /> : <ExpandMore />}</>}
            </ListItemButton>
          </CustomListItem>
          <Collapse in={AccountOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/profile')}>
                <ListItemIcon>
                  < PersonIcon sx={{ color: DrawerIconColor }}/>
                </ListItemIcon>
                <CustomListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/auth')}>
                <ListItemIcon>
                  <LockIcon sx={{ color: DrawerIconColor }}/>
                </ListItemIcon>
                <CustomListItemText primary="Authentication" />
              </ListItemButton>
             
            </List>
          </Collapse>


        </List>
        
      </Drawer>
    </Box>
    </>

  );
}
