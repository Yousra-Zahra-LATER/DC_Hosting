import React, { useState ,useEffect} from 'react';
import DataTable from "../components/DataTable";
import TabController from "../components/TabController";
import DynamicForm from "../components/DynamicForm";
import dayjs from 'dayjs';
import ClientService from "./ClientService";
import ClientTicket from "./ClientTicket";

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


  
  const tabsData = [
    { label: 'History Service', content: <ClientService/>},
    { label: 'History Ticket', content: <ClientTicket/>},
   
  ];
 


return (
  <>

      <TabController tabs={tabsData} />
    
  </>
);

};
export default ServerDetail;


