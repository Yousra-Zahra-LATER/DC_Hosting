import React, { useState } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CButton,
  CCardTitle,
  CCardText,
  CFormCheck,
} from '@coreui/react'

// SVG Checkmark
const CheckmarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: '10px', right: '10px', color: 'green' }}
  >
    <path
      d="M21 6L9 18L3 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const VPSConfiguration = () => {
  const [ram, setRam] = useState(2)
  const [storage, setStorage] = useState('50GB SSD')
  const [cpu, setCpu] = useState(2)
  const [location, setLocation] = useState('Europe')
  const [iso, setIso] = useState('Ubuntu 20.04')
  const [autoBackup, setAutoBackup] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const ramOptions = [
    { value: 2, label: '2 GB', price: 2 },
    { value: 4, label: '4 GB', price: 4 },
    { value: 8, label: '8 GB', price: 8 },
  ]

  const storageOptions = [
    { value: '50GB SSD', label: '50 GB SSD', price: 0 },
    { value: '100GB SSD', label: '100 GB SSD', price: 5 },
    { value: '200GB HDD', label: '200 GB HDD', price: 3 },
  ]

  const cpuOptions = [
    { value: 2, label: '2 Cores', price: 0 },
    { value: 4, label: '4 Cores', price: 8 },
    { value: 8, label: '8 Cores', price: 16 },
  ]

  const locationOptions = [
    { value: 'Europe', label: 'Europe', price: 0 },
    { value: 'North America', label: 'North America', price: 2 },
    { value: 'Asia', label: 'Asia', price: 3 },
  ]

  const isoOptions = [
    { value: 'Ubuntu 20.04', label: 'Ubuntu 20.04', price: 0 },
    { value: 'CentOS 7', label: 'CentOS 7', price: 0 },
    { value: 'Windows Server 2019', label: 'Windows Server 2019', price: 10 },
  ]

  const calculatePrice = () => {
    let price = 5 // Base price for VPS
    price += ramOptions.find((option) => option.value === ram).price
    price += storageOptions.find((option) => option.value === storage).price
    price += cpuOptions.find((option) => option.value === cpu).price
    price += locationOptions.find((option) => option.value === location).price
    price += isoOptions.find((option) => option.value === iso).price
    if (autoBackup) {
      price += 1 // Additional cost for auto backup
    }
    return price * quantity
  }

  const handleSelect = (setter, value) => {
    setter(value)
  }

  const renderCard = (option, selectedValue, setter) => (
    <CCard
      className={`mb-3 ${selectedValue === option.value ? 'border-primary' : ''}`}
      onClick={() => handleSelect(setter, option.value)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <CCardBody>
        <CCardTitle>{option.label}</CCardTitle>
        <CCardText>+{option.price}DA/mois</CCardText>
        {selectedValue === option.value && <CheckmarkIcon />}
      </CCardBody>
    </CCard>
  )

  return (
    <>
     {/* Additional Info Section */}
    
    <CContainer>
      <CRow>
        <CRow className="justify-content-between align-items-center mb-3">
          <CCol className="mb-4">
            <h2 style={{ fontSize: '22px' }}>Configure Your VPS</h2>
            <div
              style={{
                width: '200px',
                height: '1px',
                backgroundColor: '#4B49B6',
                marginTop: '9px',
              }}
            ></div>
          </CCol>
        </CRow>
        <CContainer className="my-8 ">
     <div className="flex flex-col lg:flex-row items-center text-black text-base font-semibold  shadow-lg  border-l-4 border-blue-500 ">
       <span className="m-3 text-center lg:text-left">
         We offer a variety of VPS configurations. Customize yours to fit your needs and get the
         best performance for your applications.
       </span>
     </div>
   </CContainer>
        <CCol md="8">
          <CCard className='mb-4 shadow-md'>
            <CCardBody>
              <div className="mb-4">
              <h5 className='mb-4'>Choose RAM</h5>
                <CRow>
                  {ramOptions.map((option) => (
                    <CCol md="4" key={option.value}>
                      {renderCard(option, ram, setRam)}
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
          <CCard className='mb-4 shadow-md'>
            <CCardBody>
              <div className="mb-4">
                <h5 className='mb-4'>Choose Storage</h5>
                <CRow>
                  {storageOptions.map((option) => (
                    <CCol md="4" key={option.value}>
                      {renderCard(option, storage, setStorage)}
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
          <CCard className='mb-4 shadow-md'>
            <CCardBody>
              <div className="mb-4">
                <h5 className='mb-4'>Choose CPU</h5>
                <CRow>
                  {cpuOptions.map((option) => (
                    <CCol md="4" key={option.value}>
                      {renderCard(option, cpu, setCpu)}
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
          <CCard className='mb-4 shadow-md'>
            <CCardBody>
              <div className="mb-4">
              <h5 className='mb-4'>Choose Location</h5>
                <CRow>
                  {locationOptions.map((option) => (
                    <CCol md="4" key={option.value}>
                      {renderCard(option, location, setLocation)}
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
          <CCard className='mb-4 shadow-md'>
            <CCardBody>
              <div className="mb-4">
              <h5 className='mb-4'>Choose ISO</h5>
                <CRow>
                  {isoOptions.map((option) => (
                    <CCol md="4" key={option.value}>
                      {renderCard(option, iso, setIso)}
                    </CCol>
                  ))}
                </CRow>
              </div>
            </CCardBody>
          </CCard>
          <CCard className='mb-4 shadow-md'>
            <CCardBody>
              <div className="mb-4">
                <CFormCheck
                  id="autoBackup"
                  label="Enable Auto Backup (+1DA/mois)"
                  checked={autoBackup}
                  onChange={(e) => setAutoBackup(e.target.checked)}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="4">
          <div style={{ position: 'sticky', bottom: 0 }}>
          <CCard className='shadow-md'>
              <CCardHeader>Summary</CCardHeader>
              <CCardBody>
                <p>
                  <strong className='mb-4'>Total Price:</strong> {calculatePrice()} DA/mois
                </p>
                <div className="mb-3">
                <h5 className='mb-4'>Quantity</h5>
                  <CButton color="light" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </CButton>
                  <span style={{ padding: '0 15px' }}>{quantity}</span>
                  <CButton color="light" onClick={() => setQuantity(quantity + 1)} >
                    +
                  </CButton>
                </div>
                <CRow className="text-center">
              <CCol>
                <CButton color="primary" type="submit" className="mt-3 rounded-0 px-5">
                Send Order
                </CButton>
              </CCol>
            </CRow>
              </CCardBody>
            </CCard>
          </div>
        </CCol>
      </CRow>
    </CContainer>
    </>
  )
}

export default VPSConfiguration
