import React , { useState }  from 'react'; // Ensure React is imported
import {
  Box,
  Grid,
  Card,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material';
import {
  FaServer,
  FaNetworkWired,
  FaUsers,
  FaChartLine,
  FaDatabase,
  FaCubes,
  FaTasks,
  FaPen
} from 'react-icons/fa';
import { green, blue, orange, red, purple, pink } from '@mui/material/colors';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {  FaCheck } from 'react-icons/fa';

const DataCenterAdminDashboard = () => {
  // Sample Data
  const stats = [
    { title: 'Total Servers', value: 120, icon: <FaServer color={blue[500]} size={24} /> },
    { title: 'Active Connections', value: 3500, icon: <FaNetworkWired color={green[500]} size={24} /> },
    { title: 'Users Online', value: 245, icon: <FaUsers color={orange[500]} size={24} /> },
    { title: 'Performance', value: '89%', icon: <FaChartLine color={red[500]} size={24} /> },
  ];

  const performanceData = [
    { name: 'Jan', CPU: 40000, Memory: 240000 },
    { name: 'Feb', CPU: 30000, Memory: 139800 },
    { name: 'Mar', CPU: 20000, Memory: 98000 },
    { name: 'Apr', CPU: 27800, Memory: 390800 },
    { name: 'May', CPU: 18900, Memory: 480000 },
    { name: 'Jun', CPU: 23900, Memory: 380000 },
    { name: 'Jul', CPU: 34900, Memory: 430000 },
  ];

  const serverStatus = [
    { name: 'Online', value: 80 },
    { name: 'Offline', value: 15 },
    { name: 'Maintenance', value: 5 },
  ];

  const activities = [
    { user: 'Admin', action: 'Added new server', time: '2 hours ago' },
    { user: 'User Security', action: 'Updated firewall license', time: '10 hours ago' },
    { user: 'User Network', action: 'Updated Switch settings', time: '5 hours ago' },
    { user: 'User System', action: 'Configured new backup policy', time: '1 day ago' },
    { user: 'User System', action: 'Deployed new VM', time: '1 day ago' },
  ];

  const datacenterDetails = [
    { name: 'Datacenter Alger', clusters: 12, devices: 250 },
    { name: 'Datacenter Oran', clusters: 10, devices: 200 },
    { name: 'Datacenter Constantine', clusters: 8, devices: 150 },
  
  ];

  const [pendingTasks, setPendingTasks] = useState([
    { task: 'Review Server Logs', due: 'Today' },
    { task: 'Update Network Security', due: 'Tomorrow' },
    { task: 'Backup Datacenter', due: 'This Week' },
    { task: 'Deploy new VM', due: 'Today' },
    { task: 'Configure new backup policy', due: 'Today' },
    { task: 'Create Backup for new client list', due: 'This Week' },
  ]);

   // Function to handle task completion
   const handleTaskCompletion = (taskToRemove) => {
    setPendingTasks(prevTasks => prevTasks.filter(task => task !== taskToRemove));
  };
  const networkLinks = [
    { name: 'Link1', dcName: 'Datacenter 1', vrfName: 'VRF1', vlan: 'VLAN1', bgp: 'BGP1', siteA: 'SiteA1', siteB: 'SiteB1', subnet: 'Subnet1' },
    { name: 'Link2', dcName: 'Datacenter 2', vrfName: 'VRF2', vlan: 'VLAN2', bgp: 'BGP2', siteA: 'SiteA2', siteB: 'SiteB2', subnet: 'Subnet2' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 3, backgroundColor: '#F5F7FA' }}>
      <Typography variant="h4" gutterBottom>
        DataCenter Admin Dashboard
      </Typography>

      {/* Scrollable Container */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {/* Summary Statistics */}
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
                <Avatar sx={{ bgcolor: 'transparent', marginRight: 2 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" color="text.primary">{stat.value}</Typography>
                  <Typography color="text.secondary">{stat.title}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Datacenter Details */}
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          {datacenterDetails.map((datacenter, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {datacenter.name}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[500] }}>
                        <FaCubes />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Clusters" secondary={datacenter.clusters} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: purple[500] }}>
                        <FaDatabase />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Devices" secondary={datacenter.devices} />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Performance Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Clusters Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="CPU" stroke={blue[500]} />
                  <Line type="monotone" dataKey="Memory" stroke={green[500]} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Server Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serverStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {serverStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        {/* My Networks Number */}
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                My Networks Number
              </Typography>
              <Typography variant="h3" color={orange[500]}>
              78
            </Typography>
          </Card>
        </Grid>

        {/* My Pending Tasks */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
            '      My Pending Tasks
            </Typography>
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <List>
                {pendingTasks.map((task, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="complete" onClick={() => handleTaskCompletion(task)}>
                          <FaCheck />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: pink[500] }}>
                          <FaTasks />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={task.task}
                        secondary={`Due: ${task.due}`}
                      />
                    </ListItem>
                    {index < pendingTasks.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Activities */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12}>
          <Card sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              '      Activities
            </Typography>
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <List>
                {activities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          {index % 2 === 0 ? <FaServer /> : <FaNetworkWired />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${activity.user} - ${activity.action}`}
                        secondary={activity.time}
                      />
                    </ListItem>
                    {index < activities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Network Links Table */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12}>
          <Card sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Network Links
            </Typography>
            <TableContainer component={Paper}>
              <Table>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Grid>
    </Box>
  </Box>
);
};

export default DataCenterAdminDashboard;
