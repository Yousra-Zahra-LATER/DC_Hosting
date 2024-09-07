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
    { id:1, name: "AT user PAM 1", email: "AT.userPAM1@at.dz", ip: "197.168.1.1", profile: "Admin", date: "2024-05-01" },
    { id:2, name: "AT user PAM 2", email: "AT.userPAM2@at.dz", ip: "197.168.1.2", profile: "user", date: "2024-05-02" },
    { id:3, name: "AT user PAM 3", email: "AT.userPAM3@at.dz", ip: "197.168.1.3", profile: "Manager", date: "2024-05-20" },
];

export default function PAMAccess() {
  const fileName = "pam_access";
  const queryClient = new QueryClient();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>PAM Access</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticData} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
