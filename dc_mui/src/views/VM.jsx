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
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', state: 'CA' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', state: 'NY' },
  { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', state: 'TX' },
];

const usStates = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
];

// Fonction pour exporter les données en CSV
const exportToCSV = (data) => {
  // Vérifiez que les données sont correctement structurées
  const csvData = data.map((item) => ({
    Id: item.id,
    FirstName: item.firstName,
    LastName: item.lastName,
    Email: item.email,
    State: item.state,
  }));

  // Utilisez PapaParse pour convertir les données en CSV
  const csv = Papa.unparse(csvData, {
    header: true,  // Inclure les en-têtes de colonnes
    delimiter: ',', // Définir le séparateur de colonnes (virgule par défaut)
    skipEmptyLines: true // Ignorer les lignes vides
  });

  // Créez un Blob à partir des données CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  // Créez un URL pour le Blob et générez un lien de téléchargement
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users.csv';  // Nom du fichier CSV
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Nettoyez l'URL une fois le téléchargement terminé
  URL.revokeObjectURL(url);
};

const exportToPDF = (data) => {
  const doc = new jsPDF();
  doc.text('User Data', 14, 16);
  doc.autoTable({
    head: [['Id', 'First Name', 'Last Name', 'Email', 'State']],
    body: data.map((item) => [item.id, item.firstName, item.lastName, item.email, item.state]),
    startY: 30,
  });
  doc.save('users.pdf');
};

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'Id', enableEditing: false, size: 80 },
      { accessorKey: 'firstName', header: 'First Name', muiEditTextFieldProps: { required: true, error: !!validationErrors?.firstName, helperText: validationErrors?.firstName, onFocus: () => setValidationErrors({ ...validationErrors, firstName: undefined }) } },
      { accessorKey: 'lastName', header: 'Last Name', muiEditTextFieldProps: { required: true, error: !!validationErrors?.lastName, helperText: validationErrors?.lastName, onFocus: () => setValidationErrors({ ...validationErrors, lastName: undefined }) } },
      { accessorKey: 'email', header: 'Email', muiEditTextFieldProps: { type: 'email', required: true, error: !!validationErrors?.email, helperText: validationErrors?.email, onFocus: () => setValidationErrors({ ...validationErrors, email: undefined }) } },
      { accessorKey: 'state', header: 'State', editVariant: 'select', editSelectOptions: usStates, muiEditTextFieldProps: { select: true, error: !!validationErrors?.state, helperText: validationErrors?.state } },
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
    muiTableContainerProps: { sx: { minHeight: '500px' } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
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
          Create New User
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
  return useMutation({
    mutationFn: (newUser) => new Promise((resolve) => setTimeout(resolve, 1000)),
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
  if (!values.firstName) errors.firstName = 'First name is required';
  if (!values.lastName) errors.lastName = 'Last name is required';
  if (!values.email) errors.email = 'Email is required';
  if (!values.state) errors.state = 'State is required';
  return errors;
};

const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Example />
    </QueryClientProvider>
  );
};

export default App;
