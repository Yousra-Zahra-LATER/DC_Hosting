import React, { useState } from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


export default function VM() {
  
  const fields = [
    { key: "id", header: "Id", enableEditing: false, size: 80 },
    { key: "name", header: "Name", required: true },
    { key: "cluster", header: "Cluster", required: true },
    { key: "ram", header: "Ram", required: true },
    { key: "disk", header: "Disk", required: true },
    { key: "ip", header: "Ip Address", required :true },
    
    { key: "server", header: "Server", required: true },
   
    
    
    { key: "os", header: "OS", required: true },
    { key: "config", header: "Configuration", required: true },
    { key: "infogerence", header: "Info_gerance", required: true },
  ];

  const data = [
    { id: '1', name: 'VM-A1',cluster: 'ClusterA',  ram: '16GB', disk: '500GB', ip: '192.168.0.10', server: 'Server1', os: 'Windows Server 2019', config : 'desc',infogerence: 'AT'},
    { id: '2', name: 'VM-B2', cluster: 'ClusterB', ram: '32GB', disk: '1TB', ip: '192.168.0.11',  server: 'Server2', os: 'Ubuntu 22.04',  config : 'desc' ,infogerence: 'Client'},
    { id: '3', name: 'VM-C3', cluster: 'ClusterC', ram: '64GB', disk: '2TB',  ip: '192.168.0.12',  server: 'Server3', os: 'macOS Ventura',  config : 'desc' ,infogerence: 'AT'},
  ];

  const fileName = "Virtual Machine";
  const queryClient = new QueryClient(); 


  return (
    <>
      <h3>Virtual Machine</h3>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={data} fields={fields} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
