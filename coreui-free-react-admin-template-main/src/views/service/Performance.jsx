import React, { memo, useState,useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardText,
  CListGroupItem,
  CRow,
  CCol,
  CCardHeader,
  CButton,
  CContainer,
  CFormInput,
  CCallout,
  CTab,CTabs,
  CTabList,
  CTabPanel,
  CTooltip,
  CLink,
  CTabContent,
  CTableBody,
  CTableHeaderCell,CTable,CTableRow

} from '@coreui/react'
import { FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa'
import {
    CTableHead,  CTableDataCell
  } from '@coreui/react'; 
  
const VPSOfferCard = memo(({ offer }) => {
  const isRecommended = offer.title === 'Recommended'

  return (
    <CCard
      className="shadow-lg transition-transform transform hover:scale-105 duration-300"
      style={
        isRecommended ? { borderColor: '#88D66C', borderWidth: '2px', borderStyle: 'solid' } : {}
      }
    >
      <CCardHeader
        className="flex items-center justify-center text-xl font-bold tracking-wider h-12"
        style={isRecommended ? { backgroundColor: '#88D66C', color: 'white' } : {}}
      >
        {isRecommended && offer.title}
      </CCardHeader>
      <CCardBody className="p-4">
        <CCardSubtitle className="text-lg font-semibold text-gray-700">
          {offer.subtitle}
        </CCardSubtitle>
        <CCardText className="mt-2 text-gray-600">{offer.description}</CCardText>
        <h3 className="text-green-600 font-bold text-2xl mt-2">{offer.discount}</h3>
        <h4 className="text-xl text-gray-800 font-semibold mt-2">{offer.price}</h4>
        <CCardText className="text-sm text-gray-500 mt-1">{offer.note}</CCardText>
        <CCardText className="text-sm text-gray-500 mt-1">{offer.renewPrice}</CCardText>
      </CCardBody>
      <CButton
        color="info"
        shape="rounded-0"
        className="m-4 hover:bg-blue-600 transition-colors duration-300"
      >
        Select
      </CButton>
      <div className="p-4 border-t border-gray-200">
        {offer.specs.map((spec, specIndex) => (
          <CListGroupItem key={specIndex} className="d-flex align-items-center m-2">
            <FaCheckCircle className="text-green-500 mr-5" /> <span>{spec}</span>
          </CListGroupItem>
        ))}
      </div>
    </CCard>
  )
})

export default function VPSOffers() {
  const osOptions = [
    { logo: '🖥️', name: 'Ubuntu', version: '20.04 LTS' },
    { logo: '💻', name: 'CentOS', version: '8 Stream' },
    { logo: '🔒', name: 'Debian', version: '10 Buster' },
    { logo: '🖥️', name: 'Windows', version: 'Server 2019' },
  ]
  const offers = [
    {
      title: '',
      subtitle: 'Pack Bronze',
      description: 'More storage means more room to play',
      discount: 'Save 64%',
      price: '10000 DA/mo*',
     
      specs: [
        '8 vCPU cores',
        '16 GB DDR5 RAM',
        '200GB NVMe Storage',
        'Unmetered bandwidth',
        'cPanel license fee included',
        '1 dedicated IP',
        'Free migration included',
      ],
      note: 'VAT not included',
    },
    {
      title: 'Recommended',
      subtitle: 'Pack Gold',
      description: 'More storage means more room to play',
      discount: 'Best Offer',
      price: '20000 DA/mo*',
    
      specs: [
        '8 vCPU cores',
        '32 GB DDR5 RAM',
        '500GB NVMe Storage',
        'Unmetered bandwidth',
        'cPanel license fee included',
        '1 dedicated IP',
        'Free migration included',
      ],
      note: 'VAT not included',
    },
    {
      title: '',
      subtitle: 'Pack Silver',
      description: 'More storage means more room to play',
      discount: 'Save 64%',
      price: '5000 DA/mo*',
      
      specs: [
        '4 vCPU cores',
        '8 GB DDR5 RAM',
        '100GB NVMe Storage',
        'Unmetered bandwidth',
        'cPanel license fee included',
        '1 dedicated IP',
        'Free migration included',
      ],
      note: 'VAT not included',
    },
  ]

  const [selectedLocation, setSelectedLocation] = useState(null)

  const dataCenter = [
    { name: 'Oran', coordinates: { top: '16.5%', left: '40%' } },
    { name: 'Constantine', coordinates: { top: '14%', left: '78%' } },
    { name: 'Alger', coordinates: { top: '12%', left: '57%' } },
  ]

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
  }




  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const cpuOptions = [
    { id: 1, cores: '2 Cores', price: 10 },
    { id: 2, cores: '4 Cores', price: 20 },
    { id: 3, cores: '8 Cores', price: 40 },
  ];

  const ramOptions = [
    { id: 1, ram: '4 GB', price: 5 },
    { id: 2, ram: '8 GB', price: 10 },
    { id: 3, ram: '16 GB', price: 20 },
  ];

  const storageOptions = [
    { id: 1, storage: '100 GB', price: 5 },
    { id: 2, storage: '250 GB', price: 10 },
    { id: 3, storage: '500 GB', price: 20 },
  ];

  // Fonction pour calculer le prix total en fonction des sélections
  useEffect(() => {
    const cpuPrice = selectedCPU ? cpuOptions.find(option => option.id === selectedCPU).price : 0;
    const ramPrice = selectedRAM ? ramOptions.find(option => option.id === selectedRAM).price : 0;
    const storagePrice = selectedStorage ? storageOptions.find(option => option.id === selectedStorage).price : 0;

    setTotalPrice((cpuPrice + ramPrice + storagePrice) * quantity);
  }, [selectedCPU, selectedRAM, selectedStorage, quantity]);

  const handleSelectCPU = (id) => setSelectedCPU(id);
  const handleSelectRAM = (id) => setSelectedRAM(id);
  const handleSelectStorage = (id) => setSelectedStorage(id);

  const incrementQuantity = () => setQuantity(prevQty => prevQty + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prevQty => prevQty - 1);
  };

  return (
    <>
      <CContainer>
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Choose the right plan for your big plans
        </h2>
        <CRow className="justify-center text-center mx-auto">
          {offers.map((offer, index) => (
            <CCol lg="4" md="6" sm="6" className="mb-8" key={index}>
              <VPSOfferCard offer={offer} />
            </CCol>
          ))}
        </CRow>
      </CContainer>

      {/* Additional Info Section */}
      <CContainer className="my-8 ">
        <div className="flex flex-col lg:flex-row items-center text-black text-base font-semibold  shadow-lg  border-l-4 border-blue-500 ">
          <span className="m-3 text-center lg:text-left">
            We offer a variety of VPS configurations. Customize yours to fit your needs and get the
            best performance for your applications.
          </span>
        </div>
      </CContainer>
      
     
    </>
  )
}
