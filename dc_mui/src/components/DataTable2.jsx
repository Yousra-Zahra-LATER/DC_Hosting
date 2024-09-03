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


const DataTable2 = (props) => {
 
  const [validationErrors, setValidationErrors] = useState({});
  const [fields, setFields] = useState(props.fields);
  const [staticData, setStaticData] = useState(props.data);
  const [fileName, setFileName] = useState(() => props.fileName || "DataTable");
  const [titleFile, setTitleFile] = useState(() => props.titleFile || "__DataTable__");
  
  
  
  const exportToCSV = (data) => {
    const csvData = data.map(item => {
      const result = {};
      
      fields.forEach(field => {
        result[field.header] = item[field.key];
      });
    
      return result;
    });
    
    const csv = Papa.unparse(csvData, {
      header: true,
      delimiter: ",",
      skipEmptyLines: true,
    });
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName + ".csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const exportToPDF = (data) => {
    const doc = new jsPDF();
  
    doc.text(titleFile, 14, 16);
  
    const headers = fields.map(field => field.header); // Génère les en-têtes
    const body = data.map(item =>
      fields.map(field => item[field.key]) // Génère les lignes en fonction des champs
    );
  
    doc.autoTable({
      head: [headers],
      body: body,
      startY: 30,
    });
  
    doc.save(fileName+".pdf");
  };
  
  
  
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
  const columns = useMemo(() => {
    return fields.map(item => ({
      accessorKey: item.key,
      header: item.header,
      enableEditing: item.enableEditing ?? true,  // Editable by default unless specified
      muiEditTextFieldProps: {
        required: item.required,
        error: !!validationErrors?.[item.key],
        helperText: validationErrors?.[item.key],
        onFocus: () =>
          setValidationErrors(prev => ({
            ...prev,
            [item.key]: undefined,
          })),
      },
    }));
  }, [fields, validationErrors]);


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
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteDataCenter(row.original.id);
    } 
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
  
  
  function validateDataCenter( values) {
    const errors = {};
  
    fields.forEach(field => {
      if (field.required && !values[field.key]) {
        errors[field.key] = `${field.header} is required`;
      }
    });
  
    return errors;
  }

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
        <DialogTitle variant="h6">Create New Data Center</DialogTitle>
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
        <DialogTitle variant="h6">Edit Data Center</DialogTitle>
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
          Add
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

  return <ThemeProvider theme={theme}>
            <MaterialReactTable table={table} />
         </ThemeProvider>
  
 
};


export default DataTable2;

