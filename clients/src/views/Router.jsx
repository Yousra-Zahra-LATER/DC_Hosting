import { useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
      id: "1",
      name: "Router Alpha",
      model: "Cisco ISR 4451-X",
      mgAddressIP: "192.168.1.1",
      location: "Rack 12/Unit 3, Paris, France",
      protocol_routing: "OSPF",
      portNumber: "GigabitEthernet0/0/0",
      activePorts: 4,
      connectionType: "Fiber",
      status: "Operational",
      maxThroughput: "10 Gbps",
    },
    {
      id: "2",
      name: "Router Bravo",
      model: "Juniper MX480",
      mgAddressIP: "192.168.2.1",
      location: "Rack 8/Unit 2, Berlin, Germany",
      protocol_routing: "BGP",
      portNumber: "xe-0/0/0",
      activePorts: 8,
      connectionType: "Ethernet",
      status: "Under Maintenance",
      maxThroughput: "40 Gbps",
    },
    {
      id: "3",
      name: "Router Charlie",
      model: "Arista 7050X3",
      mgAddressIP: "192.168.3.1",
      location: "Rack 15/Unit 4, New York, USA",
      protocol_routing: "EIGRP",
      portNumber: "Ethernet1/1",
      activePorts: 16,
      connectionType: "Fiber",
      status: "Operational",
      maxThroughput: "100 Gbps",
    },
    {
      id: "4",
      name: "Router Delta",
      model: "Huawei NE40E-X8",
      mgAddressIP: "192.168.4.1",
      location: "Rack 7/Unit 1, Tokyo, Japan",
      protocol_routing: "IS-IS",
      portNumber: "Ten-GigabitEthernet0/1/0",
      activePorts: 12,
      connectionType: "Ethernet",
      status: "Operational",
      maxThroughput: "80 Gbps",
    },
  ];
  
const exportToCSV = (data) => {
    const csvData = data.map((item) => ({
        Id: item.id,
        Name: item.name,
        Model: item.model,
        MGAdresse_IP: item.mgAddressIP,
        Emplacement: item.location,
        Protocol_Routing: item.protocol_routing,
        Port_Number: item.portNumber,
        Ports_Actifs: item.activePorts,
        Type_De_Connexion: item.connectionType,
        Status: item.status,
        Debit_Maximal: item.maxThroughput,
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
      a.download = "routers.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    
    const exportToPDF = (data) => {
      const doc = new jsPDF();
      doc.text("Router Data", 14, 16);
      doc.autoTable({
        head: [
          [
            "Id",
            "Name",
            "Model",
            "MG Adresse IP",
            "Emplacement",
            "Protocol Routing",
            "Port Number",
            "Ports Actifs",
            "Type de Connexion",
            "Status",
            "Debit Maximal",
          ],
        ],
        body: data.map((item) => [
          item.id,
          item.name,
          item.model,
          item.mgAddressIP,
          item.location,
          item.protocol_routing,
          item.portNumber,
          item.activePorts,
          item.connectionType,
          item.status,
          item.maxThroughput,
        ]),
        startY: 30,
      });
      doc.save("routers.pdf");
    };
    
const RouterTable = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Id", enableEditing: false, size: 80 },
      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, name: undefined }),
        },
      },
      {
        accessorKey: "model",
        header: "Model",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.model,
          helperText: validationErrors?.model,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, model: undefined }),
        },
      },
      {
        accessorKey: "mgAddressIP",
        header: "MG Adresse IP",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.mgAddressIP,
          helperText: validationErrors?.mgAddressIP,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, mgAddressIP: undefined }),
        },
      },
      {
        accessorKey: "location",
        header: "Emplacement (Rack/Unité)",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.location,
          helperText: validationErrors?.location,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, location: undefined }),
        },
      },
      {
        accessorKey: "protocol_routing",
        header: "Protocol Routing",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.protocol_routing,
          helperText: validationErrors?.protocol_routing,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              protocol_routing: undefined,
            }),
        },
      },
      {
        accessorKey: "portNumber",
        header: "Port Number",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.portNumber,
          helperText: validationErrors?.portNumber,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              portNumber: undefined,
            }),
        },
      },
      {
        accessorKey: "activePorts",
        header: "Ports Actifs",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.activePorts,
          helperText: validationErrors?.activePorts,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              activePorts: undefined,
            }),
        },
      },
      {
        accessorKey: "connectionType",
        header: "Type de Connexion",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.connectionType,
          helperText: validationErrors?.connectionType,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              connectionType: undefined,
            }),
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
        accessorKey: "maxThroughput",
        header: "Débit Maximal",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.maxThroughput,
          helperText: validationErrors?.maxThroughput,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              maxThroughput: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );
  // Hooks personnalisés pour gérer les routeurs
const { mutateAsync: createRouter, isPending: isCreatingRouter } = useCreateRouter();
const {
  data: fetchedRouters = [],
  isError: isLoadingRoutersError,
  isFetching: isFetchingRouters,
  isLoading: isLoadingRouters,
} = useGetRouters();
const { mutateAsync: updateRouter, isPending: isUpdatingRouter } = useUpdateRouter();
const { mutateAsync: deleteRouter, isPending: isDeletingRouter } = useDeleteRouter();


const handleCreateRouter = async ({ values, table }) => {
    // Valider les valeurs du routeur
    const newValidationErrors = validateRouter(values);
    
    // Vérifier si des erreurs de validation existent
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    
    // Réinitialiser les erreurs de validation si tout est valide
    setValidationErrors({});
    
    // Créer le nouveau routeur
    await createRouter(values);
    
    // Réinitialiser la ligne en cours de création dans la table
    table.setCreatingRow(null);
  };

  const handleSaveRouter = async ({ values, table }) => {
    const newValidationErrors = validateRouter(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateRouter(values);
    table.setEditingRow(null);
  };
  
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this router?")) {
      deleteRouter(row.original.id);
    }
  };
  
  const table = useMaterialReactTable({
    columns,
    data: fetchedRouters,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingRoutersError
      ? { color: "error", children: "Error loading data" }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "300px",
        maxHeight: "600px", // Hauteur maximale pour activer le défilement
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateRouter,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveRouter,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Create New Router</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
        <DialogTitle variant="h3">Edit Router</DialogTitle>
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
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
          Create New Router
        </Button>
        <Button variant="outlined" onClick={() => exportToCSV(fetchedRouters)}>
          Export as CSV
        </Button>
  
        <Button
          variant="outlined"
          onClick={() => exportToPDF(fetchedRouters)}
          startIcon={<FileDownloadIcon />}
        >
          Export as PDF
        </Button>
      </Box>
    ),
    state: {
      isLoading: isLoadingRouters,
      isSaving: isCreatingRouter || isUpdatingRouter || isDeletingRouter,
      showAlertBanner: isLoadingRoutersError,
      showProgressBars: isFetchingRouters,
    },
  });
  
  return <MaterialReactTable table={table} />;
};

  function useGetRouters() {
    return useQuery({
      queryKey: ["Routers"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simuler une API
        return Promise.resolve(staticData); // Utiliser les données fictives
      },
      refetchOnWindowFocus: false,
    });
  }
  
  function useCreateRouter() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (router) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      onMutate: (newRouterInfo) => {
        queryClient.setQueryData(["Routers"], (prevRouters) => {
          const routersArray = Array.isArray(prevRouters) ? prevRouters : [];
  
          const maxId =
            routersArray.length > 0
              ? Math.max(...routersArray.map((router) => router.id))
              : 0;
          const nextId = maxId + 1;
  
          return [
            ...routersArray,
            {
              ...newRouterInfo,
              id: nextId,
            },
          ];
        });
      },
    });
  }
  
  function useUpdateRouter() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (router) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      onMutate: (updatedRouterInfo) => {
        queryClient.setQueryData(["Routers"], (prevRouters) => {
          const routersArray = Array.isArray(prevRouters) ? prevRouters : [];
          return routersArray.map((router) =>
            router.id === updatedRouterInfo.id ? updatedRouterInfo : router
          );
        });
      },
    });
  }
  
  function useDeleteRouter() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (routerId) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      onMutate: (deletedRouterId) => {
        queryClient.setQueryData(["Routers"], (prevRouters) => {
          const routersArray = Array.isArray(prevRouters) ? prevRouters : [];
          return routersArray.filter((router) => router.id !== deletedRouterId);
        });
      },
    });
  }
  
  function validateRouter(values) {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.site) errors.site = "Site is required";
    if (!values.brand) errors.brand = "Brand is required";
    if (!values.model) errors.model = "Model is required";
    if (!values.uPosition) errors.uPosition = "U Position is required";
    if (!values.ram) errors.ram = "RAM is required";
    if (!values.storage) errors.storage = "Storage is required";
    if (!values.cpu) errors.cpu = "CPU is required";
    if (!values.iso) errors.iso = "ISO is required";
    if (!values.cluster) errors.cluster = "Cluster is required";
    if (!values.status) errors.status = "Status is required";
    if (!values.managementInterface) errors.managementInterface = "Management Interface is required";
    if (!values.ip) errors.ip = "IP Address is required";
    if (!values.serialNumber) errors.serialNumber = "Serial Number is required";
    return errors;
  }
  
// Créez un thème avec vos personnalisations

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <h2>Router</h2>
      <QueryClientProvider client={queryClient}>
        <RouterTable />
      </QueryClientProvider>
    </>
  );
}

export default App;
