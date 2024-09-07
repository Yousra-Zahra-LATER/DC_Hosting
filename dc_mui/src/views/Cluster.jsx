import React, { useState } from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


export default function Cluster() {
  
  const fields = [
    { key: "name", header: "Name", required: true },
    { key: "dc", header: "Data Center", required: true },
    { key: "cluster_hyp", header: "Cluster", required: true },
    { key: "ip", header: "Ip Address", required :true },
  ];

  const data = [
    { id: '1', name: 'Cluster A', dc : 'DC-25', cluster_hyp: 'Proxmox', ip: '10.225.10.1'},
    { id: '2', name: 'Cluster B',dc : 'DC-16', cluster_hyp: 'VmWare', ip: '10.116.10.10' },
    { id: '3', name: 'Cluster C', dc : 'DC-31',cluster_hyp: 'Proxmox', ip: '10.131.1.5' },
  ];

 

  const fileName = "Cluster";
  const queryClient = new QueryClient(); 


  return (
    <>
      <h3>Cluster</h3>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={data} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
