import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  { key: "datacenter", header: "Datacenter" },
  { key: "name", header: "Name", required: true },
  { key: "vlan_id", header: "VLAN ID" },
  { key: "role", header: "Role" },
];

const staticData = [
  { id:1, datacenter: "DC Alger", name: "VLAN 100", vlan_id: 100, role: "Admin" },
  { id:2, datacenter: "DC Constatine", name: "VLAN 200", vlan_id: 200, role: "User" },
  { id:3, datacenter: "DC Oran", name: "VLAN 300", vlan_id: 300, role: "Manager" },
];

export default function VLAN() {
  const fileName = "vlan";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>VLAN</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
