import React, { useState } from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


export default function SFTP() {
  
  const fields = [
    { key: "name", header: "Name", required: true },
    { key: "vmname", header: "VM", required: true },
    { key: "cliname", header: "Client", required: true },
    { key: "ip", header: "Ip Address", required :true },
  ];

  const data = [
    { id: '1', name: 'SFTP_User_A', vmname : 'vps 1', cliname: 'Client X', ip: '10.125.10.1'},
    { id: '2', name: 'SFTP_User_B',vmname : 'Vps 2', cliname: 'Client Y', ip: '10.216.10.10' },
    { id: '3', name: 'SFTP_User_C', vmname : 'Vps 3',cliname: 'Client Z', ip: '10.231.1.5' },
  ];

 

  const fileName = "SFTP";
  const queryClient = new QueryClient(); 


  return (
    <>
      <h3>SFTP</h3>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={data} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
