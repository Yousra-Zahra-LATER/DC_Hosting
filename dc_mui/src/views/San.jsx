import React from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Box} from '@mui/material';

export default function Dashboard() {
 
  const field = [
    { key: "id", header: "ID SAN", enableEditing: false, size: 80 },
    { key: "san_name", header: "SAN Name", required: true },
    { key: "dc_name", header: "DC Name", required: true },
    { key: "rack_name", header: "Rack Name" },
    { key: "rack_u", header: "Rack U" },
    { key: "model", header: "Model" },
    { key: "sn", header: "SN" },
    { key: "mgmt_ip", header: "Management IP" },
    { key: "capacity_tb", header: "Capacity (TB)" },
    { key: "connected_hosts", header: "Connected Hosts" },
    { key: "status", header: "Status" }
  ];
  


  // Static list of data centers
  const staticDat = [

      {
        id: 1,
        san_name: "SAN Alpha",
        dc_name: "Oran",
        rack_name: "Rack 1",
        rack_u: 10,
        model: "Dell EMC PowerMax 2000",
        sn: "SN-SAN-001",
        mgmt_ip: "192.168.100.10",
        capacity_tb: 500,
        connected_hosts: 50,
        status: "Active"
      },
      {
        id: 2,
        san_name: "SAN Bravo",
        dc_name: "Constantine",
        rack_name: "Rack 2",
        rack_u: 20,
        model: "HPE 3PAR StoreServ 8000",
        sn: "SN-SAN-002",
        mgmt_ip: "192.168.100.20",
        capacity_tb: 750,
        connected_hosts: 65,
        status: "Active"
      },
      {
        id: 3,
        san_name: "SAN Charlie",
        dc_name: "Alger",
        rack_name: "Rack 3",
        rack_u: 15,
        model: "NetApp AFF A300",
        sn: "SN-SAN-003",
        mgmt_ip: "192.168.100.30",
        capacity_tb: 1000,
        connected_hosts: 80,
        status: "In Maintenance"
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
        <h2>San List</h2>
      
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
