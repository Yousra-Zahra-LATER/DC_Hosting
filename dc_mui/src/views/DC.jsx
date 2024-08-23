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
    name: "Data Center 25",
    location: "Constantine",
    status: "Active",
  },
  { id: "2", name: "Data Center 16", location: "Alger", status: "Inactive" },
  { id: "3", name: "Data Center 31", location: "Oran", status: "Active" },
];

const exportToCSV = (data) => {
  const csvData = data.map((item) => ({
    Id: item.id,
    Name: item.name,
    Location: item.location,
    Status: item.status,
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
  a.download = "data_centers.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const exportToPDF = (data) => {
  const doc = new jsPDF();
  doc.text("Data Center Data", 14, 16);
  doc.autoTable({
    head: [["Id", "Name", "Location", "Status"]],
    body: data.map((item) => [item.id, item.name, item.location, item.status]),
    startY: 30,
  });
  doc.save("data_centers.pdf");
};

const DataCenterTable = () => {
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
        accessorKey: "location",
        header: "Location",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.location,
          helperText: validationErrors?.location,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, location: undefined }),
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
        },
      },
    ],
    [validationErrors]
  );

  const { mutateAsync: createDataCenter, isPending: isCreatingDataCenter } =
    useCreateDataCenter();
  const {
    data: fetchedDataCenters = [],
    isError: isLoadingDataCentersError,
    isFetching: isFetchingDataCenters,
    isLoading: isLoadingDataCenters,
  } = useGetDataCenters();
  const { mutateAsync: updateDataCenter, isPending: isUpdatingDataCenter } =
    useUpdateDataCenter();
  const { mutateAsync: deleteDataCenter, isPending: isDeletingDataCenter } =
    useDeleteDataCenter();

  const handleCreateDataCenter = async ({ values, table }) => {
    const newValidationErrors = validateDataCenter(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createDataCenter(values);
    table.setCreatingRow(null);
  };

  const handleSaveDataCenter = async ({ values, table }) => {
    const newValidationErrors = validateDataCenter(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateDataCenter(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this data center?")) {
      deleteDataCenter(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedDataCenters,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingDataCentersError
      ? { color: "error", children: "Error loading data" }
      : undefined,
    muiTableContainerProps: { sx: { minHeight: "300px" } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateDataCenter,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveDataCenter,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Create New Data Center</DialogTitle>
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
        <DialogTitle variant="h3">Edit Data Center</DialogTitle>
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
          Create New Data Center
        </Button>
        <Button
          variant="outlined"
          onClick={() => exportToCSV(fetchedDataCenters)}
        >
          Export as CSV
        </Button>

        <Button
          variant="outlined"
          onClick={() => exportToPDF(fetchedDataCenters)}
          startIcon={<FileDownloadIcon />}
        >
          Export as PDF
        </Button>
      </Box>
    ),
    state: {
      isLoading: isLoadingDataCenters,
      isSaving:
        isCreatingDataCenter || isUpdatingDataCenter || isDeletingDataCenter,
      showAlertBanner: isLoadingDataCentersError,
      showProgressBars: isFetchingDataCenters,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useGetDataCenters() {
  return useQuery({
    queryKey: ["dataCenters"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simuler une API
      return Promise.resolve(staticData); // Utiliser les données fictives
    },
    refetchOnWindowFocus: false,
  });
}

function useCreateDataCenter() {
  const queryClient = useQueryClient(); // Ajoutez cette ligne pour obtenir queryClient

  return useMutation({
    mutationFn: async (dataCenter) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newDataCenterInfo) => {
      queryClient.setQueryData(["dataCenters"], (prevDataCenters) => {
        // Ensure prevUsers is an array or default to an empty array if it's undefined
        const dataCentersArray = Array.isArray(prevDataCenters)
          ? prevDataCenters
          : [];

        // Determine the next ID by finding the maximum existing ID and adding 1
        const maxId =
          dataCentersArray.length > 0
            ? Math.max(...dataCentersArray.map((dataCenter) => dataCenter.id))
            : 0;
        const nextId = maxId + 1;

        return [
          ...dataCentersArray,
          {
            ...newDataCenterInfo,
            id: nextId, // Use the incremented ID
          },
        ];
      });
    },
  });
}

function useUpdateDataCenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dataCenter) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (updatedDataCenterInfo) => {
      queryClient.setQueryData(["dataCenters"], (prevDataCenters) => {
        const dataCentersArray = Array.isArray(prevDataCenters)
          ? prevDataCenters
          : [];
        return dataCentersArray.map((dataCenter) =>
          dataCenter.id === updatedDataCenterInfo.id
            ? updatedDataCenterInfo
            : dataCenter
        );
      });
    },
  });
}

function useDeleteDataCenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dataCenterId) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (deletedDataCenterId) => {
      queryClient.setQueryData(["dataCenters"], (prevDataCenters) => {
        const dataCentersArray = Array.isArray(prevDataCenters)
          ? prevDataCenters
          : [];
        return dataCentersArray.filter(
          (dataCenter) => dataCenter.id !== deletedDataCenterId
        );
      });
    },
  });
}

function validateDataCenter(values) {
  const errors = {};
  if (!values.name) errors.name = "Name is required";
  if (!values.location) errors.location = "Location is required";
  if (!values.status) errors.status = "Status is required";
  return errors;
}
// Créez un thème avec vos personnalisations
const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          // Personnalisez ici les styles de la table
          backgroundColor: "#ffeeed", // Exemple: couleur de fond de la table
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "", // Exemple: couleur de fond des en-têtes
          color: "black", // Exemple: couleur du texte des en-têtes
        },
        body: {
          backgroundColor: "", // Exemple: couleur de fond des cellules du corps
          color: "black", // Exemple: couleur du texte des cellules du corps
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "", // Exemple: couleur du tri des en-têtes
        },
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <h2>Data Center</h2>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <DataCenterTable />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
