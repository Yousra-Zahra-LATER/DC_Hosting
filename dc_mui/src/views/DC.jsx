import React, { useState ,useEffect} from 'react';
import DataTable from '../components/DataTable';

// import { CNavbar,CNav,CTabContent,CTabPane CNavbarBrand, CNavbarNav, CNavItem, CNavLink, CNavbarToggler, CCollapse } from '@coreui/react';
// import '@coreui/coreui/dist/css/coreui.min.css';
const DC = () =>  {
  const columns=[
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Phone number', field: 'phone'},
    {title: 'Register number',field: 'regnum'},
    {title: 'Type',field: 'Type',lookup: { 34: 'Company', 63: 'Freelancer' },},
    { title: 'Approuved', field: 'approuved', type : 'boolean'},
    
  ];
  const data=[
    { name: 'Later', surname: 'Zahra Yousra', phone: '0666666666',regnum :'547896', Type: 63, approuved : false },
    { name: 'Slimani', surname: 'Rokia', phone: '0666666666',regnum :'547896', Type: 34 ,approuved : true},
  ] ;
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const [activeKey, setActiveKey] = useState(1)
return (
  <>


  
  <DataTable DataList ={data} columnss ={columns} collections = {""} noAdds={false} noEdit={false}/>
  </>

  );
};
export default DC;


