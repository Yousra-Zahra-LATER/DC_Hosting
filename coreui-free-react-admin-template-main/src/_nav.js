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

const services = [
  { name: 'Hosting Web', to: '/service/hostingweb' },
  {
    name: 'VPS',
    to: '/service/vps',
    items: [
      { name: 'Standard', to: '/service/vps' },
      { name: 'Performance', to: '/service/vps/performance' },
      { name: 'Storage', to: '/service/vps/premium' },
    ],
  },
  { name: 'VPC', to: '/service/vpc' },
  { name: 'Backup', to: '/service/backup' },
  { name: 'Object Storage', to: '/service/objectstorage' },
  { name: 'DNS', to: '/service/DNS' },
  { name: 'Email', to: '/service/MAIL' },
];

const account = [
  { name: 'Profile', to: '/account', icon: <LuUserCog className='mr-2' size={20} /> },
  { name: 'Authentication', to: '/authentication', icon: <TbShieldLock className='mr-2' size={20} /> },
];

const actel = [
  { name: 'Customers', to: '/actel/customers' },

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
          items: service.items.map((subItem) => ({
            component: CNavItem,
            name: subItem.name,
            to: subItem.to,
            className: '', 
          })),
        };
      } else {
        return {
          component: CNavItem,
          name: service.name,
          to: service.to,
        };
      }
    }),
  },
  {
    component: CNavGroup,
    name: 'ACTEL',
    icon: <MdOutlineBusiness className='nav-icon' />,
    items: actel.map((act) => ({
      component: CNavItem,
      name: act.name,
      to: act.to,
    })),
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
    component: CNavItem,
    name: 'Support',
    to: '/support', 
    icon: <RiCustomerService2Line className='nav-icon' />,
  },
];

export default _nav;
