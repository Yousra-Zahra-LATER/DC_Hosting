import React, { useState ,useEffect} from 'react';
import DataTable from "../components/DataTable";
import TabController from "../components/TabController";
import DynamicForm from "../components/DynamicForm";
import dayjs from 'dayjs';
import HistoryServer from "../views/HistoryServer";
import {Box,Paper,Grid,TextField ,Button,Container, Typography} from '@mui/material';

const ServerDetail = () =>  {

  const formatDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY h:mm A'); // Adjust format as needed
  };

  const columns=[
    { title: 'Name', field: 'name' },
    { title: 'Price', field: 'price' },
    { title: 'Start Date', field: 'startdate'},
    {title: 'End Date',field: 'enddate'},
    
  ];
  const data=[
    { name: 'Service 1 ', price: '5300 DA', startdate: formatDate (new Date()),enddate :formatDate (new Date()) },
    { name: 'Service 2', price: '5900 DA', startdate: formatDate (new Date()),enddate :formatDate (new Date())},
  ] ;

  const xcolumns=[
    { title: 'N°', field: 'numTicket' },
    { title: 'Start Date', field: 'startdate' },
    { title: 'End Date', field: 'enddate'},
    { title: 'State', field: 'state'},
    
  ];

  const xdata=[
    { numTicket: '1500', startdate: formatDate (new Date()), enddate: formatDate (new Date()), state : 'Not Approuved'},
    { numTicket: '1501', startdate: formatDate (new Date()) , enddate: formatDate (new Date()),state : 'Approuved'},
    { numTicket: '1502', startdate: formatDate (new Date()) , enddate: formatDate (new Date()),state : 'Opened'},
    { numTicket: '1503', startdate: formatDate (new Date()) , enddate: formatDate (new Date()),state : 'Closed'},
  ] ;

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]},
  ];
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  const tabsData = [
    // { label: 'Server information', content:  <>
    //    <Container component="main" maxWidth="md"> {/* Changer maxWidth pour élargir la boîte */}
    //   <Box
    //     sx={{
            
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //         width: '100%', // Largeur de la boîte à 100% de son conteneur
    //         maxWidth: 800, // Largeur maximale de la boîte
    //         padding: 1, // Padding interne de la boîte
    //         bgcolor: 'background.paper',
    //     }}
    //   >
    //     <Typography component="h1" variant="h5"  sx={{
    //        marginBottom: 1,
    //       }}>
    //       Server informations
    //     </Typography>
        
    //     <DynamicForm fields={fields} onSubmit={handleSubmit} fieldsPerLine = {2} btnTitle =  />

    //   </Box>
    // </Container>
    //     </> },
    { label: 'History', content: <HistoryServer/>},
   
  ];
 


return (
  <>

      <TabController tabs={tabsData} />
    
  </>
);

};
export default ServerDetail;


