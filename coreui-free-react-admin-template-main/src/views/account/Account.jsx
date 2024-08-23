import React from "react";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CContainer
} from "@coreui/react";

const AccountUpdate = () => {
  return (
<CContainer className="mt-2 mb-5">
      <CRow className="justify-content-between align-items-center mb-3">
        <CCol className="mb-4">
          <h2 style={{ fontSize: '22px' }}>Update Profile</h2>
          <div style={{ width : '150px', height: '1px', backgroundColor: '#4B49B6', marginTop: '9px' }}></div>
        </CCol>
       
      </CRow>
      <CCard style={{ maxWidth: '', margin: '0 auto' }} >
       
        <CCardBody>
          <CForm>
            {/* Informations personnelles */}
            <h5 className="mt-2 mb-4">Informations Personnelles</h5>
            <CRow>
              <CCol md="6">
                <div className="mb-4 ">
                  <CFormLabel htmlFor="first_name">Prénom</CFormLabel>
                  <CFormInput type="text" id="first_name" placeholder="Prénom" />
                </div>
              </CCol>
              <CCol md="6">
                <div className="mb-4">
                  <CFormLabel htmlFor="last_name">Nom</CFormLabel>
                  <CFormInput type="text" id="last_name" placeholder="Nom" />
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <div className="mb-4">
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email"
                    placeholder="Email"
                    disabled
                  />
                </div>
              </CCol>
              <CCol md="6">
                <div className="mb-4">
                  <CFormLabel htmlFor="phone">Phone</CFormLabel>
                  <CFormInput
                    type="text"
                    id="phone"
                    placeholder="Numéro de Téléphone"
                  />
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <div className="mb-4">
                  <CFormLabel htmlFor="address">Adresse</CFormLabel>
                  <CFormInput type="text" id="address" placeholder="Adresse" />
                </div>
              </CCol>
              <CCol md="6">
                <div className="mb-4">
                  <CFormLabel htmlFor="city">Ville</CFormLabel>
                  <CFormInput type="text" id="city" placeholder="Ville" />
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <div className="mb-4">
                  <CFormLabel htmlFor="postal_code">Code Postal</CFormLabel>
                  <CFormInput
                    type="text"
                    id="postal_code"
                    placeholder="Code Postal"
                  />
                </div>
              </CCol>
              <CCol md="6">
                <div className="mb-4">
                  <CFormLabel htmlFor="country">Pays</CFormLabel>
                  <CFormInput type="text" id="country" placeholder="Pays" />
                </div>
              </CCol>
            </CRow>

          

            {/* Informations d'hébergement */}
            <hr />
            <h5 className="mt-4 mb-4">Informations d'Hébergement</h5>
            <div className="mb-4">
              <CFormLabel htmlFor="company_name">Nom de l'Entreprise</CFormLabel>
              <CFormInput
                type="text"
                id="company_name"
                placeholder="Nom de l'Entreprise"
              />
            </div>

            {/* Bouton de soumission */}
            <CRow className="text-end">
              <CCol>
                <CButton color="primary" type="submit" className="mt-3 rounded-0 px-5">
                  Update Profile
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default AccountUpdate;
