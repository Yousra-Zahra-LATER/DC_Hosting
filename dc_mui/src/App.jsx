import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './views/Profile';
import Dashboard from './views/Dashboard';
import Server from './views/Server';
import RouterPage from './views/Router';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import DC from './views/DC';
import VM from './views/VM';
import San from './views/San';
import Ls from './views/Ls';
import Pdu from './views/Pdu';
import SWITCH from './views/Switch';
import Firewall from './views/Firewall';
import Cluster from './views/Cluster';
import CloudDashboard from './views/CloudDashboard';
import Authentication from './views/Auuthentication';
import Rack from './views/Rack';
// Importez d'autres composants si nécessaire

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh'}}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' , overflow:'hidden'}}>
          <Navbar />
          <Box sx={{ flexGrow: 1, backgroundColor: 'white', padding: 2}}>
            <Routes>
              <Route path="/" element={<Dashboard />} exact/>
              <Route path="/clouddashboard" element={<CloudDashboard />} />
              
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Authentication/>} />
              
              <Route path="/vm" element={<VM />} />
              <Route path="/cluster" element={<Cluster />} />
              <Route path="/datacenter" element={<DC />} />
              <Route path="/rack" element={<Rack />} />
              <Route path="/server" element={<Server />} />
              <Route path="/router" element={<RouterPage />} />
              <Route path="/switch" element={<SWITCH/>} />
              <Route path="/firewall" element={<Firewall />} />
              <Route path="/san" element={<San />} />
              <Route path="/ls" element={<Ls />} />
              <Route path="/pdu" element={<Pdu />} />
              {/* Add more routes as needed */}
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  
  );
}

export default App;
