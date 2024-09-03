import React, { useState } from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


export default function VApp() {
  
  const fields = [
    { key: "id", header: "Id", enableEditing: false, size: 80 },
    { key: "name", header: "Name", required: true },
    { key: "template", header: "Data Center", required: true },
    { key: "type", header: "Cluster", required: true },

  ];

  const data = [
    { id: '1', name: 'vApp A', template : 'template 25', type: 'A'},
    { id: '2', name: 'vApp B',template : 'template 16', type: 'B'},
    { id: '3', name: 'vApp C', template : 'template 31',type: 'C' },
  ];

 

  const fileName = "vAPP";
  const queryClient = new QueryClient(); 


  return (
    <>
      <h3>vAPP</h3>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={data} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
