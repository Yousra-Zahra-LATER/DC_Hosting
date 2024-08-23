import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateCsv } from 'export-to-csv'; // CSV export library
import jsPDF from 'jspdf'; // PDF export library
import 'jspdf-autotable'; // For table export with jsPDF
import Papa from 'papaparse';
// Liste statique des utilisateurs
const staticData = [
  { id: '1', name: 'Cluster A', status: 'Active', site: 'DC-25', nbserver: 5, nbvm: 20 },
  { id: '2', name: 'Cluster B', status: 'Inactive', site: 'DC-16', nbserver: 3, nbvm: 15 },
  { id: '3', name: 'Cluster C', status: 'Active', site: 'DC-16', nbserver: 8, nbvm: 30 },
];


const usStates = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
];

// Fonction pour exporter les données en CSV
const exportToCSV = (data) => {
  const csvData = data.map((item) => ({
    Id: item.id,
    Name: item.name,
    Status: item.status,
    Site: item.site,
    NBServer: item.nbserver,
    NBVM: item.nbvm,
  
  }));

  const csv = Papa.unparse(csvData, {
    header: true,
    delimiter: ',',
    skipEmptyLines: true,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'servers.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const exportToPDF = (data) => {
  const doc = new jsPDF();
  doc.text('Server Data', 14, 16);
  doc.autoTable({
    head: [['Id', 'Name', 'Status', 'Site', 'NBServer', 'NBVM']],
    body: data.map((item) => [
      item.id,
      item.name,
      item.status,
      item.site,
      item.nbserver,
      item.nbvm,
      ]),
    startY: 30,
  });
  doc.save('servers.pdf');
};


const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [

      { accessorKey: 'id', header: 'ID', enableEditing: false, size: 80 },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'status', header: 'Status' },
      { accessorKey: 'site', header: 'Site' },
      { accessorKey: 'nbserver', header: 'NB Server' },
      { accessorKey: 'nbvm', header: 'NB VM' }
    ],
    [validationErrors]
  );
  

  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null);
  };

  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? { color: 'error', children: 'Error loading data' }
      : undefined,
      muiTableContainerProps: {
        sx: {
          minHeight: "300px",
          maxHeight: "600px", // Hauteur maximale pour activer le défilement
        },
      },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Create Cluster</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
          Create Cluster
        </Button>
        <Button
          variant="outlined"
          onClick={() => exportToCSV(fetchedUsers)}
        >
          Export as CSV
        </Button>
        <Button
          variant="outlined"
          onClick={() => exportToPDF(fetchedUsers)}
        >
          Export as PDF
        </Button>
      </Box>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};
function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simuler une API
      return Promise.resolve(staticData); // Utiliser les données fictives
    },
    refetchOnWindowFocus: false,
  });
}

function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) => {
        // Ensure prevUsers is an array or default to an empty array if it's undefined
        const usersArray = Array.isArray(prevUsers) ? prevUsers : [];

        // Determine the next ID by finding the maximum existing ID and adding 1
        const maxId = usersArray.length > 0 
          ? Math.max(...usersArray.map(user => user.id)) 
          : 0;
        const nextId = maxId + 1;

        return [
          ...usersArray,
          {
            ...newUserInfo,
            id: nextId, // Use the incremented ID
          },
        ];
      });
    },
  });
}




function useUpdateUser() {
  return useMutation({
    mutationFn: (updatedUser) => new Promise((resolve) => setTimeout(resolve, 1000)),
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedUserId) => new Promise((resolve) => setTimeout(resolve, 1000)),
    onMutate: (deletedUserId) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((prevUser) => prevUser.id !== deletedUserId),
      );
    },
  });
}

const validateUser = (values) => {
  const errors = {};
  // if (!values.firstName) errors.firstName = 'First name is required';
  // if (!values.lastName) errors.lastName = 'Last name is required';
  // if (!values.email) errors.email = 'Email is required';
  // if (!values.state) errors.state = 'State is required';
  return errors;
};

const App = () => {
  return (
   <>
    <h1 style={{marginBottom:'20px'}}>Cluster</h1>
    <QueryClientProvider client={new QueryClient()}>
      <Example />
    </QueryClientProvider>
    </> 
  );
};

export default App;
