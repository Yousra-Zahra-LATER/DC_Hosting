import React, { useState } from 'react';
import DataTable2 from '../components/DataTable2';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState(''); // State pour stocker la location sélectionnée

  const field = [
    { key: "id", header: "Id", enableEditing: false, size: 80 },
    { key: "name", header: "Name", required: true },
    { key: "location", header: "Location", required: true },
    { key: "status", header: "Status" }
  ];

  // Liste statique des centres de données
  const staticDat = [
    { id: "1", name: "Data Center 25", location: "Constantine", status: "Active" },
    { id: "2", name: "Data Center 16", location: "Alger", status: "Inactive" },
    { id: "3", name: "Data Center 31", location: "Oran", status: "Active" },
  ];

  const fileName = "dashboard";
  const queryClient = new QueryClient(); 

  // Filtrer les données en fonction de la location sélectionnée
  const filteredData = selectedLocation
    ? staticDat.filter(data => data.location === selectedLocation)
    : staticDat;

  console.log('Filtered Data:', filteredData); // Vérifiez si les données sont bien filtrées

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Aligns items vertically in the center
          marginBottom: "1rem",
        }}
      >
        <h2>Data Center</h2>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="location-select-label">Search By Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={selectedLocation}
            label="Location"
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <MenuItem value="">
              <em>All Locations</em>
            </MenuItem>
            <MenuItem value="Constantine">Constantine</MenuItem>
            <MenuItem value="Alger">Alger</MenuItem>
            <MenuItem value="Oran">Oran</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <QueryClientProvider client={queryClient}>
        <DataTable2 data={filteredData} fields={field} fileName={fileName} />
      </QueryClientProvider>
    </>
  );
}
