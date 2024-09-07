import React from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Box} from '@mui/material';

export default function Dashboard() {
 
  const field = [

    { key: "rack_name", header: "Rack Name", required: true },
    { key: "rack_u", header: "Rack U", required: true },
    { key: "dc_name", header: "DC Name" }
  ];

  // Static list of data centers
  const staticDat = [
    { id: "1",rack_name: "AT-B001", rack_u: "42", dc_name: "Constantine" },
    { id: "2",rack_name: "AT-B002", rack_u: "42", dc_name: "Alger" },
    { id: "3",rack_name: "AT-B003", rack_u: "42", dc_name: "Constantine" },
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
        <h2>Rack List</h2>
      
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={staticDat} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
