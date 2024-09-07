import React from "react";
import DataTable2 from "../components/DataTable2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";

export default function Dashboard() {
  const field = [
    { key: "switch_name", header: "Switch Name", required: true },
    { key: "dc_name", header: "DC Name", required: true },
    { key: "rack_name", header: "Switch Name" },
    { key: "rack_u", header: "Rack U" },
    { key: "role_switch", header: "Role" },
    { key: "sn", header: "SN" },
    { key: "MGMT", header: "IP MGMT" },
    { key: "model", header: "Model" },
    { key: "ports", header: "Ports " },
    { key: "uplink", header: "Uplink " },
  ];

  const staticDat = [
    {
      id: 1,
      switch_name: "Switch 01",
      dc_name: "Constantine",
      rack_name: "Rack 1",
      rack_u: 2,
      role_switch: "Core Switch",
      sn: "SN12345",
      MGMT: "192.168.0.10",
      model: "Cisco Catalyst 9300",
      ports: 24,
      uplink: "10Gbps"
    },
    {
      id: 2,
      switch_name: "Switch 02",
      dc_name: "Alger",
      rack_name: "Rack 2",
      rack_u: 3,
      role_switch: "Access Switch",
      sn: "SN67890",
      MGMT: "192.168.0.20",
      model: "Juniper EX4300",
      ports: 48,
      uplink: "1Gbps"
    },
    {
      id: 3,
      switch_name: "Switch 03",
      dc_name: "Oran",
      rack_name: "Rack 3",
      rack_u: 4,
      role_switch: "Distribution Switch",
      sn: "SN11223",
      MGMT: "192.168.0.30",
      model: "Arista 7050X",
      ports: 32,
      uplink: "40Gbps"
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
        <h2>Switch List</h2>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
