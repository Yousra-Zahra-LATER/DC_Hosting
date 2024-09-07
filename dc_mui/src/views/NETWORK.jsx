import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  { key: "datacenter", header: "Datacenter" },
  { key: "subnet", header: "Subnet" },
  { key: "role", header: "Role" },
];

const staticData = [
  { id:1, datacenter: "DC Alger", subnet: "192.168.10.0/24", role: "Admin" },
  { id:2, datacenter: "DC Constatine", subnet: "192.168.20.0/24", role: "User" },
  { id:3, datacenter: "DC Oran", subnet: "192.168.30.0/24", role: "Manager" },
];

export default function NETWORK() {
  const fileName = "network";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>NETWORK</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
