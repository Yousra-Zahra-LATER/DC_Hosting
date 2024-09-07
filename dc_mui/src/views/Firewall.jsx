import React from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Box} from '@mui/material';

export default function Dashboard() {
 
  const field = [
  
    { key: "firewall_name", header: "Firewall Name", required: true },
    { key: "dc_name", header: "DC Name", required: true },
    { key: "rack_name", header: "Rack Name" },
    { key: "rack_u", header: "Rack U" },
    { key: "role_firewall", header: "Role" },
    { key: "sn", header: "SN" },
    { key: "MGMT", header: "IP MGMT" },
    { key: "model", header: "Model" },

  ];


  // Static list of data centers
  const staticDat = [

      {
        id: 1,
        firewall_name: "Firewall 01",
        dc_name: "Alger",
        rack_name: "Rack 1",
        rack_u: 2,
        role_firewall: "Edge Firewall",
        sn: "SN12345",
        MGMT: "192.168.1.10",
        model: "Cisco Firepower 2140"
      },
      {
        id: 2,
        firewall_name: "Firewall 02",
        dc_name: "Constantine",
        rack_name: "Rack 2",
        rack_u: 3,
        role_firewall: "Core Firewall",
        sn: "SN67890",
        MGMT: "192.168.1.20",
        model: "Palo Alto PA-850"
      },
      {
        id: 3,
        firewall_name: "Firewall 03",
        dc_name: "Constantine",
        rack_name: "Rack 3",
        rack_u: 4,
        role_firewall: "Internal Firewall",
        sn: "SN11223",
        MGMT: "192.168.1.30",
        model: "Fortinet FortiGate 100F"
      }
    ];
    

  const fileName = "rack";
  const queryClient = new QueryClient(); 



  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>Firewall List</h2>
      
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
