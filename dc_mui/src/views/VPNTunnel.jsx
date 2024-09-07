import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  { key: "name", header: "Name", required: true },
  { key: "site1_ip", header: "Site1 IP" },
  { key: "site2_ip", header: "Site2 IP" },
];

const staticData = [
  { id:1, name: "Tunnel Oran-CTN", site1_ip: "10.0.0.1", site2_ip: "10.0.0.2" },
  { id:2, name: "Tunnel CTN-Alger", site1_ip: "10.0.1.1", site2_ip: "10.0.1.2" },
  { id:3, name: "Tunnel Alger-Oran", site1_ip: "10.0.2.1", site2_ip: "10.0.2.2" },
];

export default function VPNTunnel() {
  const fileName = "vpn_tunnel";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>VPN Tunnel</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
