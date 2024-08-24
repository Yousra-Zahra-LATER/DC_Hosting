import React, { useState ,useEffect} from 'react';
import DataTable from "../../components/DataTable";
import '@coreui/coreui/dist/css/coreui.min.css';
import { Button,Box} from '@mui/material';
import { Person } from "@material-ui/icons";
import CustomerDetail from './Customerdetail';
import ModalContent  from '../../components/ModalContent';
import { CCol, CRow } from '@coreui/react';

const Customers = () =>  {
  const columns=[
    { title: '#', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Phone number', field: 'phone'},
    {title: 'Register number',field: 'regnum'},
    {title: 'Type',field: 'Type',lookup: { 34: 'Company', 63: 'Freelancer' },},
    { title: 'Approuved', field: 'approuved', type : 'boolean'},
    
  ];
  const data=[
    { id : '1',name: 'Client 1', surname: 'Mohammed', phone: '0666666456',regnum :'547845', Type: 63, approuved : false },
    { id : '2',name: 'Client 2', surname: 'Ahmed', phone: '0666666666',regnum :'547896', Type: 34 ,approuved : true},
  ] ;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedId, setSelectedId] = useState(null);

  const handleRowSelect = (id) => {
    setSelectedId(id);
    // Vous pouvez également utiliser l'ID ici comme nécessaire
    console.log('ID sélectionné:', id);
  };


return (
  <>
   <CRow className="justify-content-between align-items-center mb-3">
          <CCol className="mb-2">
            <h2 style={{ fontSize: '22px' }}>List Of Clients</h2>
            <div
              style={{
                width: '138px',
                height: '1px',
                backgroundColor: '#4B49B6',
                marginTop: '9px',
              }}
            ></div>
          </CCol>
        </CRow>
      <div>
        <Box pb={1}>
          <Button variant="contained" startIcon={<Person />} onClick={handleClickOpen} className='mb-2'>
          Customer detail
          </Button>
        </Box>
        
        <ModalContent open={open} onClose={handleClose} title = {"Customer detail"} content = {<CustomerDetail/>} withActionBtn = {true}/>
      </div>
      
      <DataTable isCheck = {false} DataList ={data} columns ={columns} collections = {""} isEditable = {true} noAdds={false} noEdit={false} onRowSelect = { handleRowSelect }/>
    
  </>
);
// return (
//   <>
//   <DataTable DataList ={data} columnss ={columns} collections = {""} noAdds={false} noEdit={false}/>
//   </>

//   );
};
export default Customers;


