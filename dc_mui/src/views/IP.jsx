import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  
  { key: "datacenter", header: "Datacenter" },
  { key: "subnet", header: "Subnet" },
  { key: "ip", header: "IP", required: true },
  { key: "role", header: "Role" },
];

const staticData = [
  {id:1,  datacenter: "DC Alger", subnet: "192.168.10.0/24", ip: "192.168.10.1", role: "Admin" },
  {id:2, datacenter: "DC Constantine", subnet: "192.168.20.0/24", ip: "192.168.20.1", role: "User" },
  {id:3, datacenter: "DC Oran", subnet: "192.168.30.0/24", ip: "192.168.30.1", role: "Manager" },
];

export default function IP() {
  const fileName = "ip";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>IP</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
