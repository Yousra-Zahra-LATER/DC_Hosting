import React from "react";
import DataTable2 from "../components/DataTable2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";

export default function Dashboard() {
  const field = [
    { key: "id", header: "ID Server", enableEditing: false, size: 80 },
    { key: "router_name", header: "Router Name", required: true },
    { key: "dc_name", header: "DC Name", required: true },
    { key: "rack_name", header: "Rack Name" },
    { key: "rack_u", header: "Rack U" },
    { key: "role_router", header: "Role" },
    { key: "sn", header: "SN" },
    { key: "MGMT", header: "IP MGMT" },
    { key: "model", header: "Model" },
    { key: "ports", header: "Ports " },
  ];

  const staticDat = [
    {
      id: 1,
      router_name: "Router 01",
      dc_name: "Alger",
      rack_name: "Rack 1",
      rack_u: 2,
      role_router: "Core Router",
      sn: "SN12345",
      MGMT: "192.168.0.1",
      model: "Cisco ASR 9001",
      ports: 8
    },
    {
      id: 2,
      router_name: "Router 02",
      dc_name: "Alger",
      rack_name: "Rack 2",
      rack_u: 3,
      role_router: "Edge Router",
      sn: "SN67890",
      MGMT: "192.168.0.2",
      model: "Juniper MX480",
      ports: 16
    },
    {
      id: 3,
      router_name: "Router 03",
      dc_name: "Oran",
      rack_name: "Rack 3",
      rack_u: 4,
      role_router: "Distribution Router",
      sn: "SN11223",
      MGMT: "192.168.0.3",
      model: "Arista 7500R",
      ports: 12
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
        <h2>Router List</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
