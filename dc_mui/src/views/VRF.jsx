import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  { key: "datacenter", header: "Datacenter" },
  { key: "name", header: "Name", required: true },
  { key: "role", header: "Role" },
];

const staticData = [
  { id:1, datacenter: "DC Alger", name: "VRF 100", role: "Admin" },
  { id:2, datacenter: "DC Constatine", name: "VRF 200", role: "User" },
  { id:3, datacenter: "DC Oran", name: "VRF 300", role: "Manager" },
];

export default function VRF() {
  const fileName = "vrf";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>VRF</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
