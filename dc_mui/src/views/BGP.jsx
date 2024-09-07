import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  { key: "datacenter", header: "Datacenter" },
  { key: "bgp_as", header: "BGP AS" },
  { key: "role", header: "Role" },
];

const staticData = [
    { id:1, datacenter: "DC ALger", bgp_as: "65001", role: "Provider" },
    { id:2, datacenter: "DC Oran", bgp_as: "65002", role: "Peer" },
    { id:3, datacenter: "DC Constantine", bgp_as: "65003", role: "Customer" },
    { id:4, datacenter: "DC Ouargla", bgp_as: "65004", role: "Transit" },
    { id:5, datacenter: "DC Annaba", bgp_as: "65005", role: "Route Server" },
  ];
  
export default function BGP() {
  const fileName = "bgp";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>BGP</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
