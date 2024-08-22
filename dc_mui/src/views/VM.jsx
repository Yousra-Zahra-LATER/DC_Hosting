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
  { id: '1', vmname: 'VM-A1', ram: '16GB', disk: '500GB', cpu: 'Intel Xeon', ip: '192.168.0.10', nameclient: 'ClientX', nameserver: 'Server1', site: 'DC-25', os: 'Windows Server 2019', namecluster: 'ClusterA', status: 'Active', role: 'Administrator' },
  { id: '2', vmname: 'VM-B2', ram: '32GB', disk: '1TB', cpu: 'AMD Ryzen 9', ip: '192.168.0.11', nameclient: 'ClientY', nameserver: 'Server2', site: 'DC-25', os: 'Ubuntu 22.04', namecluster: 'ClusterB', status: 'Inactive', role: 'User' },
  { id: '3', vmname: 'VM-C3', ram: '64GB', disk: '2TB', cpu: 'Intel i9', ip: '192.168.0.12', nameclient: 'ClientZ', nameserver: 'Server3', site: 'DC-16', os: 'macOS Ventura', namecluster: 'ClusterC', status: 'Active', role: 'User' },
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
    VMName: item.vmname,
    RAM: item.ram,
    Disk: item.disk,
    CPU: item.cpu,
    IP: item.ip,
    ClientName: item.nameclient,
    ServerName: item.nameserver,
    Site: item.site,
    OS: item.os,
    ClusterName: item.namecluster,
    Status: item.status,
    Role: item.role,
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
    head: [['Id', 'VM Name', 'RAM', 'Disk', 'CPU', 'IP Address', 'Client Name', 'Server Name', 'Site', 'OS', 'Cluster Name', 'Status', 'Role']],
    body: data.map((item) => [item.id, item.vmname, item.ram, item.disk, item.cpu, item.ip, item.nameclient, item.nameserver, item.site, item.os, item.namecluster, item.status, item.role]),
    startY: 30,
  });
  doc.save('servers.pdf');
};


const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'Id', enableEditing: false, size: 80 },
      { accessorKey: 'vmname', header: 'VM Name' },
      { accessorKey: 'ram', header: 'RAM' },
      { accessorKey: 'disk', header: 'Disk' },
      { accessorKey: 'cpu', header: 'CPU' },
      { accessorKey: 'ip', header: 'IP Address' },
      { accessorKey: 'nameclient', header: 'Client Name' },
      { accessorKey: 'nameserver', header: 'Server Name' },
      { accessorKey: 'site', header: 'Site' },
      { accessorKey: 'os', header: 'OS' },
      { accessorKey: 'namecluster', header: 'Cluster Name' },
      { accessorKey: 'status', header: 'Status' },
      { accessorKey: 'role', header: 'Role' },
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
        <DialogTitle variant="h3">Create VM</DialogTitle>
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
          Create VM
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
    <h1 style={{marginBottom:'20px'}}>vm</h1>
    <QueryClientProvider client={new QueryClient()}>
      <Example />
    </QueryClientProvider>
    </> 
  );
};

export default App;
