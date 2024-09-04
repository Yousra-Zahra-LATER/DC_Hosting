import React from "react";
import DataTable2 from "../components/DataTable2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";

export default function Dashboard() {
  const field = [
    { key: "id", header: "ID Server", enableEditing: false, size: 80 },
    { key: "server_name", header: "Server Name", required: true },
    { key: "dc_name", header: "DC Name", required: true },
    { key: "rack_name", header: "Rack Name" },
    { key: "rack_u", header: "Rack U" },
    { key: "role_server", header: "Role" },
    { key: "sn", header: "SN" },
    { key: "MGMT", header: "IP MGMT" },
    { key: "model", header: "Model" },
    { key: "os", header: "System OS" },
    { key: "cpu", header: "CPU " },
    { key: "ram", header: "RAM" },
    { key: "disk", header: "DISK " },
    { key: "note", header: "Note " },
  ];

  const staticDat = [
    {
      id: 1,
      server_name: "Server 01",
      dc_name: "Alger",
      rack_name: "Rack 1",
      rack_u: 2,
      role_server: "Web Server",
      sn: "SN12345",
      MGMT: "192.168.1.1",
      model: "Dell R710",
      os: "Ubuntu 20.04",
      cpu: "Intel Xeon E5-2670",
      ram: "32GB",
      disk: "2TB SSD",
      note: "Primary web server",
    },
    {
      id: 2,
      server_name: "Server 02",
      dc_name: "Constantine",
      rack_name: "Rack 3",
      rack_u: 5,
      role_server: "Database Server",
      sn: "SN67890",
      MGMT: "192.168.1.2",
      model: "HP ProLiant DL380",
      os: "CentOS 7",
      cpu: "Intel Xeon E5-2690",
      ram: "64GB",
      disk: "4TB HDD",
      note: "Main database server",
    },
    {
      id: 3,
      server_name: "Server 03",
      dc_name: "Oran",
      rack_name: "Rack 2",
      rack_u: 4,
      role_server: "Application Server",
      sn: "SN11223",
      MGMT: "192.168.1.3",
      model: "Cisco UCS C240",
      os: "Windows Server 2019",
      cpu: "Intel Xeon Gold 5120",
      ram: "128GB",
      disk: "1TB NVMe",
      note: "High-performance application server",
    },
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
        <h2>Server List</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
