import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineManageAccounts,MdOutlineBusiness } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { LuUserCog } from "react-icons/lu";
import { TbShieldLock } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoTicketOutline } from "react-icons/io5";
import { MdWeb } from "react-icons/md";
import { IoMdCloudOutline } from "react-icons/io";
import { LuDatabaseBackup } from "react-icons/lu";
import { GrStorage } from "react-icons/gr";
import { MdOutlineDns } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineCloudServer } from "react-icons/ai";
const services = [
  { name: 'Hosting Web', to: '/service/hostingweb',icon: <MdWeb  className='mr-2' size={20} />},
  {
    name: 'VPS',
    to: '/service/vps',
    icon: <AiOutlineCloudServer  className='mr-2' size={20} />,
    items: [
      { name: 'Standard', to: '/service/vps/standard' },
      { name: 'Performance', to: '/service/vps/performance' },
      { name: 'Storage', to: '/service/vps/storage' },
    ],
  },
  { name: 'VPC', to: '/service/vpc' ,icon: <IoMdCloudOutline  className='mr-2' size={20} />},
  { name: 'Backup', to: '/service/backup' ,icon: <LuDatabaseBackup   className='mr-2' size={20} />},
  { name: 'Object Storage', to: '/service/objectstorage' ,icon: <GrStorage className='mr-2' size={20} />},
  { name: 'DNS', to: '/service/DNS' ,icon: <MdOutlineDns  className='mr-2' size={20} />},
  { name: 'Email', to: '/service/MAIL' ,icon: <IoMailOutline  className='mr-2' size={20} />},
];

const account = [
  { name: 'Profil', to: '/account', icon: <LuUserCog className='mr-2' size={20} /> },
  { name: 'Authentication', to: '/authentication', icon: <TbShieldLock className='mr-2' size={20} /> },
];

const actel = [
  { name: 'Clients', to: '/customers' , icon: <HiOutlineUserGroup  className='mr-2' size={20} />},
  { name: 'Tickets', to: '/tickets' , icon: <IoTicketOutline className='mr-2' size={20} /> },

];

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <LuLayoutDashboard className='nav-icon' />,
  },
  {
    component: CNavGroup,
    name: 'Services',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: services.map((service) => {
      if (service.items) {
        return {
          component: CNavGroup,
          name: service.name,
          to: service.to,
          icon: service.icon, // Use the icon defined in the `account` array
          items: service.items.map((subItem) => ({
            component: CNavItem,
            name: subItem.name,
            to: subItem.to,
         
          })),
        };
      } else {
        return {
          component: CNavItem,
          name: service.name,
          to: service.to,
          icon: service.icon, // Use the icon defined in the `account` array
        };
      }
    }),
  },
  {
    component: CNavItem,
    name: 'Support',
    to: '/support', 
    icon: <RiCustomerService2Line className='nav-icon' />,
  },
  {
    component: CNavGroup,
    name: 'Account',
    icon: <FaRegUserCircle className='nav-icon' />,
    items: account.map((acc) => ({
      component: CNavItem,
      name: acc.name,
      to: acc.to,
      icon: acc.icon, // Use the icon defined in the `account` array
    })),
  },

  {
    component: CNavGroup,
    name: 'COMMERCIAL',
    icon: <MdOutlineBusiness className='nav-icon' />,
    items: actel.map((act) => ({
      component: CNavItem,
      name: act.name,
      to: act.to,
      icon: act.icon, // Use the icon defined in the `account` array
    })),
  },
];

export default _nav;
