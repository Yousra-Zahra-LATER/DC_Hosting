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

import DataCenterAdminDashboard from './views/DataCenterAdminDashboard';
// Importez d'autres composants si nécessaire

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Navbar />

          <Box sx={{ flexGrow: 1, backgroundColor: "white", padding: 2 }}>
            <Routes>
              <Route path="/" element={<DataCenterAdminDashboard />} exact />
              <Route path="/clouddashboard" element={<CloudDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/datacenter" element={<DC />} />
              <Route path="/rack" element={<Rack />} />
              <Route path="/server" element={<Server />} />
              <Route path="/router" element={<RouterPage />} />
              <Route path="/switch" element={<SWITCH />} />
              <Route path="/firewall" element={<Firewall />} />
              <Route path="/san" element={<San />} />
              <Route path="/ls" element={<Ls />} />
              <Route path="/pdu" element={<Pdu />} />
              <Route path="/vm" element={<VM />} />
              <Route path="/cluster" element={<Cluster />} />
              <Route path="/vApp" element={<VApp />} />
              <Route path="/sFTP" element={<SFTP />} />

              <Route path="/InternetAccess" element={<InternetAccess />} />
              <Route path="/HRAccess" element={<HRAccess />} />
              <Route path="/PAMAccess" element={<PAMAccess />} />
              <Route path="/ERPAccess" element={<ERPAccess />} />

              <Route path="/VLAN" element={<VLAN />} />
              <Route path="/NETWORK" element={<NETWORK />} />
              <Route path="/VRF" element={<VRF />} />
              <Route path="/IP" element={<IP />} />
              <Route path="/BGP" element={<BGP />} />

              <Route path="/VPNTunnel" element={<VPNTunnel />} />
              <Route path="/VPNClient" element={<VPNClient />} />
              {/* Add more routes as needed */}
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
