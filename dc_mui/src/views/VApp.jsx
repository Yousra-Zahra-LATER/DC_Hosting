import React, { useState } from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


export default function VApp() {
  
  const fields = [
        { key: "name", header: "Name", required: true },
    { key: "template", header: "Data Center", required: true },
    { key: "type", header: "Cluster", required: true },

  ];

 const data = [
  { id: '1', name: 'ClientPortal', template: 'Customer Access 3.1', type: 'Public' },
  { id: '2', name: 'NetworkMonitor', template: 'Network Monitoring 4.5', type: 'Internal' },
  { id: '3', name: 'BillingSystem', template: 'Billing & Invoicing 2.0', type: 'Internal' },
  { id: '4', name: 'ServiceProvisioning', template: 'Provisioning Suite 1.7', type: 'Internal' },
  { id: '5', name: 'SupportCenter', template: 'Support Desk 5.2', type: 'Public' },
  { id: '6', name: 'CloudServices', template: 'Cloud Management 6.3', type: 'Internal' },
  { id: '7', name: 'VoIPManager', template: 'Voice Services 2.8', type: 'Internal' },
  { id: '8', name: 'InfrastructureControl', template: 'Infrastructure Management 4.9', type: 'Internal' },
  { id: '9', name: 'SecuritySuite', template: 'Security Management 3.6', type: 'Internal' },
  { id: '10', name: 'FiberOpticManager', template: 'Fiber Management 7.0', type: 'Internal' },
  { id: '11', name: 'SMSGateway', template: 'Messaging Service 2.1', type: 'Public' },
  { id: '12', name: 'DataCenterOps', template: 'Data Center Operations 5.4', type: 'Internal' }
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
