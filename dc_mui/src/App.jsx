import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Profile from "./views/Profile";

import Dashboard from "./views/Dashboard";

import Server from "./views/Server";

import RouterPage from "./views/Router";

import Sidebar from "./components/Sidebar";

import Navbar from "./components/Navbar";

import Box from "@mui/material/Box";

import DC from "./views/DC";

import VM from "./views/VM";

import Cluster from "./views/Cluster";

import ServerDetail from "./views/ServerDetails";

import ClientDetail from "./views/ClientDetail";

import Tasks from "./views/Tasks";

import Clients from "./views/Clients";

import CloudDashboard from "./views/CloudDashboard";

import Authentication from "./views/Auuthentication";

import VApp from "./views/VApp";

import SFTP from "./views/SFTP";

import HRAccess from "./views/HRAccess";

import ERPAccess from "./views/ERPAccess";

import InternetAccess from "./views/InternetAccess";

import PAMAccess from "./views/PAMAccess";

import VLAN from './views/VLAN';
import NETWORK from './views/NETWORK';
import VRF from './views/VRF';
import IP from './views/IP';
import BGP from './views/BGP';

import VPNTunnel from './views/VPNTunnel';
import VPNClient from './views/VPNClient';

import San from "./views/San";
import Ls from "./views/Ls";
import Pdu from "./views/Pdu";
import SWITCH from "./views/Switch";
import Firewall from "./views/Firewall";
import Rack from './views/Rack';

import Login from './views/LoginHome';

import DataCenterAdminDashboard from './views/DataCenterAdminDashboard';
// Importez d'autres composants si nécessaire

function App() {
  return (
    <Router>
      
      <Routes>
      {/*je veux que 1 premierement le quand lapp run le Login saffiche apres je me connecte pour aller au deuxieme route  */}
      <Route path="/" element={<Login />} />
       </Routes>

      
    </Router>
  );
}

export default App;
