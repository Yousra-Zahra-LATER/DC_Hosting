import React from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Box} from '@mui/material';

export default function Dashboard() {
 
  const field = [
    { key: "id", header: "ID Server", enableEditing: false, size: 80 },
    { key: "dc_name", header: "DC Name", required: true },
    { key: "rack_name", header: "Rack Name" },
    { key: "source", header: "Soruce" },
    { key: "sn", header: "SN" },

  ];


  // Static list of data centers
  const staticDat = [

      {
        id: 1,
        dc_name: "Oran",
        rack_name: "Rack 1",
        source: "Main Power",
        sn: "SN-PDU-001"
      },
      {
        id: 2,
        dc_name: "Constantine",
        rack_name: "Rack 2",
        source: "Backup Power",
        sn: "SN-PDU-002"
      },
      {
        id: 3,
        dc_name: "Alger",
        rack_name: "Rack 3",
        source: "Main Power",
        sn: "SN-PDU-003"
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
        <h2>PDU List</h2>
      
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
