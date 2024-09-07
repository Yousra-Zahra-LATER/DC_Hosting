import React from 'react';
import DataTable2 from '../components/DataTable2';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from '@mui/material';

const fields = [
  { key: "name", header: "Name", required: true },
  { key: "email", header: "Email" },
  { key: "ip", header: "IP" },
  { key: "profile", header: "Profile" },
  { key: "date", header: "Date" },
];

const staticData = [
    { id:1, name: "AT user ERP 1", email: "AT.userERP1@at.dz", ip: "178.168.1.1", profile: "Admin", date: "2024-05-01" },
    { id:2, name: "AT user ERP 2", email: "AT.userERP2@at.dz", ip: "178.168.1.2", profile: "System ", date: "2024-05-02" },
    { id:3, name: "AT user ERP 3", email: "AT.userERP3@at.dz", ip: "178.168.1.3", profile: "Manager", date: "2024-05-20" },
];

function ERPAccess() {
  const fileName = "erp_access";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>ERP Access</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}

export default ERPAccess;