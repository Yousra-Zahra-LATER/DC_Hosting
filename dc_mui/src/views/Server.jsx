import React from "react";
import DataTable2 from "../components/DataTable2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";

export default function Dashboard() {
  const field = [
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
    {
      id: 4,
      server_name: "Server 04",
      dc_name: "Alger",
      rack_name: "Rack 4",
      rack_u: 6,
      role_server: "Backup Server",
      sn: "SN44556",
      MGMT: "192.168.1.4",
      model: "Lenovo ThinkSystem SR650",
      os: "Red Hat Enterprise Linux 8",
      cpu: "Intel Xeon Silver 4210",
      ram: "64GB",
      disk: "10TB SATA",
      note: "Backup and recovery server",
    },
    {
      id: 5,
      server_name: "Server 05",
      dc_name: "Constantine",
      rack_name: "Rack 5",
      rack_u: 3,
      role_server: "DevOps Server",
      sn: "SN78901",
      MGMT: "192.168.1.5",
      model: "Supermicro SuperServer",
      os: "Debian 11",
      cpu: "AMD EPYC 7502P",
      ram: "256GB",
      disk: "2TB SSD + 8TB HDD",
      note: "Server for DevOps tools and CI/CD pipelines",
    }
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
