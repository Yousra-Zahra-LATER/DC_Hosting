import React, { useState, } from 'react';
import DataTable2  from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// Fonction pour lire un cookie
export default function Dashboard() {
  
 
  const field = [
    { key: "id", header: "Id", enableEditing: false, size: 80 },
    { key: "name", header: "Name" },
    { key: "location", header: "Location" },
    { key: "status", header: "Status" }
  ];

  // Liste statique des centres de données
const staticDat = [
  {id: "1",name: "Data Center 25",location: "Constantine",status: "Active"},
  { id: "2", name: "Data Center 16", location: "Alger", status: "Inactive" },
  { id: "3", name: "Data Center 31", location: "Oran", status: "Active" },
];
const fileName = "dashboard"
const queryClient = new QueryClient(); 
  return (
   <>
    <QueryClientProvider client={queryClient}>
    <DataTable2 data = {staticDat} fields = {field}  fileName = {fileName}></DataTable2> 
    </QueryClientProvider>
 
   
   </>
  );
}
