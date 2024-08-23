import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './views/Profile';
import Dashboard from './views/Dashboard';
import Server from './views/Server';
import Routeur from './views/Router';
import MiniDrawer from './components/Sidebar';
import Box from '@mui/material/Box';
import DC from './views/DC';
import VM from './views/VM';
import Cluster from './views/Cluster';
import Authentication from './views/Auuthentication';
import ServerDetail from './views/ServerDetails';
import ClientDetail from './views/ClientDetail';
import Tasks from './views/Tasks';
import Clients from './views/Clients';
// Importez d'autres composants si nécessaire

function App() {
  return (
  <Router>
      <Box sx={{ display: 'flex' }}>
       <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'65px',overflow:'auto'}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} /> 
            <Route path="/client" element={<Clients/>} /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/dc" element={<DC/>} />
            <Route path="/server" element={<Server/>}/> 
            <Route path="/router" element={<Routeur/>}/> 
            <Route path="/vm" element={<VM/>} /> 
            <Route path="/cluster" element={<Cluster/>} /> 
            <Route path="/auth" element={<Authentication/>} /> 
            <Route path="/serverDetail" element={<ServerDetail/>} /> 
            <Route path="/clientDetail" element={<ClientDetail/>} /> 
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
