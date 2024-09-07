import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  { key: "datacenter", header: "Datacenter" },
  { key: "gateway_ip", header: "Gateway IP", required: true },
  { key: "vpn_user", header: "VPN User" },
  { key: "vpn_password", header: "VPN Password" },
  { key: "vpn_type", header: "VPN Type" },
  { key: "role", header: "Role" },
];

const staticData = [
  { id:1, datacenter: "DC Oran", gateway_ip: "192.168.1.1", vpn_user: "user1", vpn_password: "pass1", vpn_type: "Ipsec", role: "Admin" },
  { id:2, datacenter: "DC Constantine", gateway_ip: "192.168.1.2", vpn_user: "user2", vpn_password: "pass2", vpn_type: "SSL", role: "User" },
  { id:3, datacenter: "DC Alger", gateway_ip: "192.168.1.3", vpn_user: "user3", vpn_password: "pass3", vpn_type: "SSL", role: "User" },
];

export default function VPNClient() {
  const fileName = "vpn_client";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>VPN Client</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
