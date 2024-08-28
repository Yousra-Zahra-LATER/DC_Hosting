import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DetailIcon from "@mui/icons-material/ZoomIn";
import ServerDetail from "./ServerDetails";

import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { generateCsv } from "export-to-csv"; // CSV export library
import jsPDF from "jspdf"; // PDF export library
import "jspdf-autotable"; // For table export with jsPDF
import Papa from "papaparse";

// Liste statique des centres de données
const staticData = [
  {
    DateBegin: "20/05/2024",
    DateEND: "30/05/2024",
    site: "DC-25",
    rack: "Rack 1",
    uPosition: "U1",
    cluster: "Cluster A",
    status: "Active",
    ilo: "192.168.1.1",
    ip: "192.168.1.10",
  },
  {
    DateBegin: "10/01/2024", // Added to match structure
    DateEND: "23/08/2024", // Renamed from 'name'
    site: "DC-25",
    rack: "Rack 2",
    uPosition: "U2",
    cluster: "Cluster B",
    status: "Inactive",
    ilo: "192.168.1.2",
    ip: "192.168.1.11",
  },
  
];


const exportToCSV = (data) => {
  const csvData = data.map((item) => ({
    DateBegin: item.id,
    DateEND: item.name,
    Site: item.site,
    Rack: item.rack,
    U_Position: item.uPosition,
    Cluster: item.cluster,
    Status: item.status,
    ILO: item.ilo,
    IP_Address: item.ip,
  }));

  const csv = Papa.unparse(csvData, {
    header: true,
    delimiter: ",",
    skipEmptyLines: true,
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "servers.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const exportToPDF = (data) => {
  const doc = new jsPDF();
  doc.text("Server Data", 14, 16);
  doc.autoTable({
    head: [
      [
        "DateBegin",
        "DateEND",
        "Site",
        "Rack",
        "U Position",
        "Cluster",
        "Status",
        "ILO",
        "IP Address",
      ],
    ],
    body: data.map((item) => [
      item.DateBegin,
      item.DateEND,
      item.site,
      item.rack,
      item.uPosition,
      item.cluster,
      item.status,
      item.ilo,
      item.ip,
    ]),
    startY: 30,
  });
  doc.save("servers.pdf");
};

const ServerTable = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { accessorKey: "DateBegin", header: "Date begin", },
      {
        accessorKey: "DateEND",
        header: "Date end",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, name: undefined }),
        },
      },
      {
        accessorKey: "site",
        header: "Site",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.site,
          helperText: validationErrors?.site,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, site: undefined }),
        },
      },

      {
        accessorKey: "rack",
        header: "Rack",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.rack,
          helperText: validationErrors?.rack,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, rack: undefined }),
        },
      },
      {
        accessorKey: "uPosition",
        header: "U Position",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.uPosition,
          helperText: validationErrors?.uPosition,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, uPosition: undefined }),
        },
      },

      {
        accessorKey: "cluster",
        header: "Cluster",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.cluster,
          helperText: validationErrors?.cluster,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, cluster: undefined }),
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, status: undefined }),
        },
      },
      {
        accessorKey: "ilo",
        header: "ILO",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.ilo,
          helperText: validationErrors?.ilo,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, ilo: undefined }),
        },
      },
      {
        accessorKey: "ip",
        header: "IP",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.ip,
          helperText: validationErrors?.ip,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, ip: undefined }),
        },
      },
 
    ],
    [validationErrors]
  );

  const { mutateAsync: createServer, isPending: isCreatingServer } =
    useCreateServer();
  const {
    data: fetchedServers = [],
    isError: isLoadingServersError,
    isFetching: isFetchingServers,
    isLoading: isLoadingServers,
  } = useGetServers();
  const { mutateAsync: updateServer, isPending: isUpdatingServer } =
    useUpdateServer();
  const { mutateAsync: deleteServer, isPending: isDeletingServer } =
    useDeleteServer();

  const handleCreateServer = async ({ values, table }) => {
    const newValidationErrors = validateServer(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createServer(values);
    table.setCreatingRow(null);
  };

  const handleSaveServer = async ({ values, table }) => {
    const newValidationErrors = validateServer(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateServer(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this data center?")) {
      deleteServer(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedServers,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingServersError
      ? { color: "error", children: "Error loading data" }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "300px",
        maxHeight: "600px", // Hauteur maximale pour activer le défilement
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateServer,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveServer,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Create New Server</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
        >
         
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit Server</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {/* <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        
        <Button variant="outlined" onClick={() => exportToCSV(fetchedServers)}>
          Export as CSV
        </Button>

        <Button
          variant="outlined"
          onClick={() => exportToPDF(fetchedServers)}
          startIcon={<FileDownloadIcon />}
        >
          Export as PDF
        </Button>

      </Box>
    ),
    state: {
      isLoading: isLoadingServers,
      isSaving: isCreatingServer || isUpdatingServer || isDeletingServer,
      showAlertBanner: isLoadingServersError,
      showProgressBars: isFetchingServers,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useGetServers() {
  return useQuery({
    queryKey: ["Servers"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simuler une API
      return Promise.resolve(staticData); // Utiliser les données fictives
    },
    refetchOnWindowFocus: false,
  });
}

function useCreateServer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (Server) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newServerInfo) => {
      queryClient.setQueryData(["Servers"], (prevServers) => {
        const serversArray = Array.isArray(prevServers)
        ? prevServers
        : [];

      // Determine the next ID by finding the maximum existing ID and adding 1
      const maxId =
      serversArray.length > 0
          ? Math.max(...serversArray.map((server) => server.id))
          : 0;
      const nextId = maxId + 1;

      return [
        ...serversArray,
        {
          ...newServerInfo,
          id: nextId, // Use the incremented ID
        },
      ];
    });
  },
});
}
function useUpdateServer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (Server) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (updatedServerInfo) => {
      queryClient.setQueryData(["Servers"], (prevServers) => {
        const ServersArray = Array.isArray(prevServers) ? prevServers : [];
        return ServersArray.map((Server) =>
          Server.id === updatedServerInfo.id ? updatedServerInfo : Server
        );
      });
    },
  });
}

function useDeleteServer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ServerId) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (deletedServerId) => {
      queryClient.setQueryData(["Servers"], (prevServers) => {
        const ServersArray = Array.isArray(prevServers) ? prevServers : [];
        return ServersArray.filter((Server) => Server.id !== deletedServerId);
      });
    },
  });
}

function validateServer(values) {
  const errors = {};
  if (!values.name) errors.name = "Name is required";
  if (!values.site) errors.site = "Site is required";
  if (!values.brand) errors.brand = "Brand is required";
  if (!values.rack) errors.rack = "Rack is required";
  if (!values.uPosition) errors.uPosition = "U Position is required";
  if (!values.ram) errors.ram = "RAM is required";
  if (!values.storage) errors.storage = "Storage is required";
  if (!values.cpu) errors.cpu = "CPU is required";
  if (!values.iso) errors.iso = "ISO is required";
  if (!values.cluster) errors.cluster = "Cluster is required";
  if (!values.status) errors.status = "Status is required";
  if (!values.ilo) errors.ilo = "ILO is required";
  if (!values.ip) errors.ip = "IP Address is required";
  if (!values.serialNumber) errors.serialNumber = "Serial Number is required";
  return errors;
}
// Créez un thème avec vos personnalisations

const queryClient = new QueryClient();

function HistoryServer() {
  

  return (
    <>
     
      <QueryClientProvider client={queryClient}>
        <ServerTable />
      </QueryClientProvider>
    </>
  );
}

export default HistoryServer;
