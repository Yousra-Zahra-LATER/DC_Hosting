import React from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Box} from '@mui/material';

export default function Dashboard() {
 
  const field = [
    { key: "name", header: " Name", required: true },
    { key: "dc_name", header: "DC Name" },
    { key: "vrf", header: "VRF Name" },
    { key: "vlan", header: "vlan" },
    { key: "bgp", header: "BGP" },
    { key: "site_a", header: "SITE_A" },
    { key: "site_b", header: "SITE_B" },
    { key: "subnet", header: "Subnet" },

  ];


  // Static list of data centers
  const staticDat = [

      {
        id: 1,
        name: "Link 01",
        dc_name: "DC North",
        vrf: "VRF-001",
        vlan: 100,
        bgp: "65001",
        site_a: "Site A1",
        site_b: "Site B1",
        subnet: "192.168.10.0/24"
      },
      {
        id: 2,
        name: "Link 02",
        dc_name: "DC South",
        vrf: "VRF-002",
        vlan: 200,
        bgp: "65002",
        site_a: "Site A2",
        site_b: "Site B2",
        subnet: "192.168.20.0/24"
      },
      {
        id: 3,
        name: "Link 03",
        dc_name: "DC East",
        vrf: "VRF-003",
        vlan: 300,
        bgp: "65003",
        site_a: "Site A3",
        site_b: "Site B3",
        subnet: "192.168.30.0/24"
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
        <h2>LS List</h2>
      
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
