
import React, { useState } from "react";

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



export default function Navbar() {

  const [anchorElUser, setAnchorElUser] = useState(null);



  const handleOpenUserMenu = (event) => {

    setAnchorElUser(event.currentTarget);

  };



  const handleCloseUserMenu = () => {

    setAnchorElUser(null);

  };



  const handleLogout = () => {

    // Logic for logout (e.g., redirecting to signin page)

    window.location.href = "http://10.96.16.53:3000/auth/signin";

  };



  const settings = ["Profile", "Account", "Dashboard", "Logout"];



  return (

    <AppBar

      position="static"

      sx={{ height: "8.5vh", backgroundColor: "#1a1c3b" }}

    >

      <Toolbar>

        <Typography variant="h8" sx={{ flexGrow: 1 }}>

          Welcome, User!

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
