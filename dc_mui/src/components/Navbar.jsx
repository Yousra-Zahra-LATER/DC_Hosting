import React, { useState, useEffect } from "react";
import {

  AppBar,

  Toolbar,

  Typography,

  Box,

  Tooltip,

  IconButton,

  Menu,

  MenuItem,

  Badge,

} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";

import NotificationsIcon from "@mui/icons-material/Notifications";

import AccountCircle from "@mui/icons-material/AccountCircle"; // Importation mise à jour

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function Navbar() {
  const [userData, setUserData] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const userDataCookie = getCookie("userData");
    if (userDataCookie) {
      setUserData(JSON.parse(decodeURIComponent(userDataCookie)));
      console.log(
        "Données utilisateur:",
        JSON.parse(decodeURIComponent(userDataCookie))
      );
    } else {
      console.log(
        "Aucun cookie trouvé, redirection vers la page de connexion."
      );
      window.location.href = "http://localhost:3000/auth/signin";
    }
  }, []);

  const handleOpenUserMenu = (event) => {

    setAnchorElUser(event.currentTarget);

  };



  const handleCloseUserMenu = () => {

    setAnchorElUser(null);

  };



  const handleLogout = () => {
    document.cookie =
      "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "http://localhost:3000/auth/signin";
  };



  const settings = ["Profile", "Account", "Dashboard", "Logout"];



  return (

    <AppBar

      position="static"

      sx={{ height: "8.5vh", backgroundColor: "#1a1c3b" }}

    >

      <Toolbar>

        <Typography variant="h8" sx={{ flexGrow: 1 }}>
          {userData ? <div>Welcome, {userData.email}!</div> : <p>Loading...</p>}
        </Typography>



        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1 }}>

          <Tooltip title="Check mails">

            <IconButton color="inherit">

              <Badge badgeContent={4} color="error">

                <MailIcon />

              </Badge>

            </IconButton>

          </Tooltip>

          <Tooltip title="Notifications">

            <IconButton color="inherit">

              <Badge badgeContent={17} color="error">

                <NotificationsIcon />

              </Badge>

            </IconButton>

          </Tooltip>

          <Tooltip title="Open settings">

            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircle sx={{ width: 25, height: 25, color: 'white' }} />

            </IconButton>

          </Tooltip>

        </Box>



        <Menu

          sx={{ mt: "45px" }}

          id="menu-appbar"

          anchorEl={anchorElUser}

          anchorOrigin={{

            vertical: "top",

            horizontal: "right",

          }}

          keepMounted

          transformOrigin={{

            vertical: "top",

            horizontal: "right",

          }}

          open={Boolean(anchorElUser)}

          onClose={handleCloseUserMenu}

        >

          {settings.map((setting) => (

            <MenuItem

              key={setting}

              onClick={

                setting === "Logout" ? handleLogout : handleCloseUserMenu

              }

            >

              <Typography sx={{ textAlign: "center" }}>{setting}</Typography>

            </MenuItem>

          ))}

        </Menu>

      </Toolbar>

    </AppBar>

  );

}
