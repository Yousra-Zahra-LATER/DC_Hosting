import React, { useState ,useEffect} from 'react';
import DataTable from "../../components/DataTable";
import TabController from "../../components/TabController";
import '@coreui/coreui/dist/css/coreui.min.css';
//import dayjs from 'dayjs';
import {Box,Paper,Grid,TextField } from '@mui/material';



const CustomerDetail = () =>  {

  {/*const formatDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY h:mm A'); // Adjust format as needed
  };
*/}
  const columns=[
    { title: 'Name', field: 'name' },
    { title: 'Price', field: 'price' },
    { title: 'Start Date', field: 'startdate'},
    {title: 'End Date',field: 'enddate'},
    
  ];
  const data=[
    { name: 'Service 1 ', price: '5300 DA', startdate: '21/10/2024',enddate :'21/10/2024' },
    { name: 'Service 2', price: '5900 DA', startdate: '21/10/2024',enddate :'21/10/2024'},
  ] ;

  const xcolumns=[
    { title: 'N°', field: 'numTicket' },
    { title: 'Start Date', field: 'startdate' },
    { title: 'End Date', field: 'enddate'},
    { title: 'State', field: 'state'},
    
  ];

  const xdata=[
    { numTicket: '1500', startdate: '21/10/2024', enddate:'21/10/2024', state : 'Not Approuved'},
    { numTicket: '1501', startdate: '21/10/2024', enddate: '21/10/2024',state : 'Approuved'},
    { numTicket: '1502', startdate: '21/10/2024' , enddate: '21/10/2024',state : 'Opened'},
    { numTicket: '1503', startdate: '21/10/2024', enddate: '21/10/2024',state : 'Closed'},
  ] ;
  const tabData = [
    {
      id: 'tab1',
      title: 'Personal informations',
      content:  <>
      <Box sx={{ flexGrow: 1 }} p = {1} >
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
        <TextField
             label="Subject"
             name="name"
             fullWidth
             required
           />
        </Grid>
        <Grid item xs={6} md={4}>
        <TextField
             label="Subject"
             name="name"
             fullWidth
             required
           />
        </Grid>
        <Grid item xs={6} md={4}>
        <TextField
             label="Subject"
             name="name"
             fullWidth
             required
           />
        </Grid>
        <Grid item xs={6} md={8}>
        <TextField
             label="Subject"
             name="name"
             fullWidth
             required
           />
        </Grid>
      </Grid>
    </Box>
      </>

     ,
    },
    {
      id: 'tab2',
      title: 'Services',
      content:<Box p={1}><DataTable isCheck = {false} DataList ={data} columns ={columns} collections = {""} noAdds={true} noEdit={true} />,</Box>
      
      
    },
    {
      id: 'tab3',
      title: 'Tickets',
      content: <Box p={1}>
      <DataTable isCheck = {false} DataList ={xdata} columns ={xcolumns} collections = {""} noAdds={true} noEdit={true}/>,
      </Box>
    
    },
  ];


 


return (
  <>

      <TabController tabs={tabData} />
    
  </>
);

};
export default CustomerDetail;


