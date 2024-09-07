import React, { useState } from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


export default function VM() {
  
  const fields = [
    
    { key: "name", header: "Name", required: true },
    { key: "cluster", header: "Cluster", required: true },
    { key: "ram", header: "Ram", required: true },
    { key: "disk", header: "Disk", required: true },
    { key: "ip", header: "Ip Address", required :true },
    
    { key: "server", header: "Server", required: true },
   
    
    
    { key: "os", header: "OS", required: true },
    { key: "config", header: "VM Configuration", required: true },
   ];

 const data = [
  {
    id: '1',
    name: 'VPS-CRM-Prod',
    cluster: 'ClusterA',
    ram: '16GB',
    disk: '500GB',
    ip: '192.168.0.10',
    server: 'Server1',
    os: 'Windows Server 2019',
    config: 'IIS10-ASP.NET4.8-SQLServer2019',
    infogerence: 'AT'
  },
  {
    id: '2',
    name: 'VPS-Web-Portal',
    cluster: 'ClusterB',
    ram: '32GB',
    disk: '1TB',
    ip: '192.168.0.11',
    server: 'Server2',
    os: 'Ubuntu 22.04',
    config: 'Apache2-PHP8.1-MySQL8.0',
    infogerence: 'Client'
  },
  {
    id: '3',
    name: 'VPS-DevOps-Toolchain',
    cluster: 'ClusterC',
    ram: '64GB',
    disk: '2TB',
    ip: '192.168.0.12',
    server: 'Server3',
    os: 'CentOS 8',
    config: 'Jenkins2.346-Docker20.10-Kubernetes1.24',
    infogerence: 'AT'
  },
  {
    id: '4',
    name: 'VPS-Analytics-Platform',
    cluster: 'ClusterD',
    ram: '128GB',
    disk: '4TB',
    ip: '192.168.0.13',
    server: 'Server4',
    os: 'Ubuntu 20.04',
    config: 'Hadoop3.3-Spark3.1-Python3.8',
    infogerence: 'AT'
  },
  {
    id: '5',
    name: 'VPS-Mail-Server',
    cluster: 'ClusterE',
    ram: '16GB',
    disk: '500GB',
    ip: '192.168.0.14',
    server: 'Server5',
    os: 'Debian 11',
    config: 'Postfix3.6-Dovecot2.3-OpenDKIM2.11',
    infogerence: 'Client'
  },
  {
    id: '6',
    name: 'VPS-Web-Service-API',
    cluster: 'ClusterF',
    ram: '32GB',
    disk: '1TB',
    ip: '192.168.0.15',
    server: 'Server6',
    os: 'Windows Server 2022',
    config: 'IIS10-.NETCore5.0-SQLServer2019',
    infogerence: 'AT'
  },
  {
    id: '7',
    name: 'VPS-E-Commerce-App',
    cluster: 'ClusterG',
    ram: '64GB',
    disk: '2TB',
    ip: '192.168.0.16',
    server: 'Server7',
    os: 'Ubuntu 22.04',
    config: 'Nginx1.18-ReactJS18.0-Django4.1-PostgreSQL13',
    infogerence: 'Client'
  },
  {
    id: '8',
    name: 'VPS-Mobile-Backend',
    cluster: 'ClusterH',
    ram: '32GB',
    disk: '1TB',
    ip: '192.168.0.17',
    server: 'Server8',
    os: 'CentOS 7',
    config: 'SpringBoot2.7-Java11-MySQL8.0',
    infogerence: 'AT'
  },
  {
    id: '9',
    name: 'VPS-Internal-Messaging',
    cluster: 'ClusterI',
    ram: '16GB',
    disk: '500GB',
    ip: '192.168.0.18',
    server: 'Server9',
    os: 'Debian 10',
    config: 'RabbitMQ3.8-Kotlin1.5-MongoDB4.4',
    infogerence: 'Client'
  },
  {
    id: '10',
    name: 'VPS-Inventory-Management',
    cluster: 'ClusterJ',
    ram: '32GB',
    disk: '1TB',
    ip: '192.168.0.19',
    server: 'Server10',
    os: 'Ubuntu 20.04',
    config: 'ReactJS18.0-NodeJS16.14-Express4.17-MongoDB5.0',
    infogerence: 'AT'
  },
  {
    id: '11',
    name: 'VPS-Payment-Gateway',
    cluster: 'ClusterK',
    ram: '64GB',
    disk: '2TB',
    ip: '192.168.0.20',
    server: 'Server11',
    os: 'Red Hat Enterprise Linux 8',
    config: 'Java11-SpringBoot2.5-OracleDB19c',
    infogerence: 'Client'
  },
  {
    id: '12',
    name: 'VPS-Customer-Support-Portal',
    cluster: 'ClusterL',
    ram: '16GB',
    disk: '500GB',
    ip: '192.168.0.21',
    server: 'Server12',
    os: 'Ubuntu 22.04',
    config: 'Nginx1.20-VueJS3-Django3.2-MySQL8.0',
    infogerence: 'AT'
  }
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
