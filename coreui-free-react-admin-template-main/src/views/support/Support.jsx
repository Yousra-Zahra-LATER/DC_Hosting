import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Select, MenuItem } from '@mui/material';
import ModalContent from '../../components/ModalContent';
import TabController from '../../components/TabController';
import dayjs from 'dayjs';

import DataTable from '../../components/DataTable';
import { Add, Check, Person } from '@material-ui/icons';
const Support = () => {

  const xcolumns=[
    { title: 'N°', field: 'numTicket' },
    { title: 'Start Date', field: 'startdate' },
    { title: 'End Date', field: 'enddate'},
    { title: 'Subject', field: 'subject'},
    { title: 'Products', field: 'product'},
    { title: 'Description', field: 'desc'},
    
  ];

  const formatDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY h:mm A'); // Adjust format as needed
  };
  
  const xdata=[
    { numTicket: '1500', startdate: formatDate (new Date()), enddate: formatDate (new Date()), subject :'', product : '', desc : ''},
    { numTicket: '1500', startdate: formatDate (new Date()) , enddate: formatDate (new Date()),subject :'', product : '', desc : ''},
  ] ;


  const [dataArray, setDataArray] = useState(xdata);

  const [tabData, settabData] = useState([
    {
      id: 'tab1',
      title: 'Not Approuved Tickets',
      content:  <>
       <DataTable DataList ={dataArray} columns ={xcolumns} collections = {""} noAdds={true} noEdit={true}/>
      </>

     ,
    },
    {
      id: 'tab2',
      title: 'Approuved Tickets',
      content: <DataTable DataList ={xdata} columns ={xcolumns} collections = {""} noAdds={true} noEdit={true}/>,
    },
    {
      id: 'tab3',
      title: 'Opened Tickets',
      content:<DataTable DataList ={xdata} columns ={xcolumns} collections = {""} noAdds={true} noEdit={true}/>,

    },

    {
      id: 'tab4',
      title: 'Closed Tickets',
      content:<DataTable DataList ={xdata} columns ={xcolumns} collections = {""} noAdds={true} noEdit={true}/>,

    },
  ]);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    subject: '',
    product: '',
    desc : ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    const newData = { numTicket: '1501', startdate: formatDate (new Date()), enddate: formatDate (new Date())
      ,subject :formData.subject, product : formData.product, desc : formData.desc
    };

    setDataArray(prevDataArray => {
      const updatedDataArray = [...prevDataArray, newData];
      // Update the relevant tab content
      const updatedTabData = tabData.map(tab => {
        if (tab.id === 'tab1') {
          return { ...tab, content: <DataTable DataList={updatedDataArray} columns={xcolumns} collections="" noAdds={true} noEdit={true} /> };
        }
        return tab;
      });
      settabData(updatedTabData);
      return updatedDataArray;
    });
    
    setFormData({
      subject: '',
      product: '',
      desc: ''
    });
    
  };
  return (
      <>

<div>
    <Box pb ={1}>
    <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
      New Ticket
    </Button>
    </Box>
    <ModalContent open={open} onClose={handleClose} title = {"New Ticket"} content = {
      <Box p ={1}>
        <form onSubmit={handleSubmit}>
       <Grid container spacing={1}>
         <Grid item xs={12}>
           <TextField
             label="Subject"
             name='subject'
             value={formData.subject}
             onChange={handleChange}
             fullWidth
             required
           />
         </Grid>
         <Grid item xs={12}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            value={formData.product}
            onChange={handleChange}
            name='product'
            required
          
          >
            <MenuItem value={10}>Product 1</MenuItem>
            <MenuItem value={20}>Product 2</MenuItem>
          </Select>
         </Grid>

         <Grid item xs={12}>
           <TextField
             label="Description"
             name='desc'
             value={formData.desc}
             onChange={handleChange}
             multiline
             maxRows={4}
             fullWidth
             required
           />
         </Grid>

         <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained"  endIcon={<Check />}>
                Submit
              </Button>
          </Box>            
        </Grid>
        </Grid>
         
         
          
          </form>
      </Box>
       
    } />
</div>


<TabController tabs={tabData} />
      </>
  );
};

export default Support;
