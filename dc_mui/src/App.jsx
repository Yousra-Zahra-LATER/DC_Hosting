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
  <Box sx={{backgroundColor:'#FFFFFF'}}>
       <MiniDrawer />
       </Box> 
  );
}

export default App;
