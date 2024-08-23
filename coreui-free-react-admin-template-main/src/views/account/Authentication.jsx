import React, { useState } from "react";
import {
  CForm,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CContainer,
  CAlert
} from "@coreui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  // Define a constant for the current password
  const CURRENT_PASSWORD = "OldPassword123";

  // State for form fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // State for visibility of passwords
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // State for error messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate current password
    if (currentPassword !== CURRENT_PASSWORD) {
      setError("Unable to update password: Current password is invalid.");
      resetForm();
      return;
    }

    // If the new password and confirmation do not match, clear the form and display the error
    if (newPassword !== confirmNewPassword) {
      setError("The passwords you entered do not match.");
      resetForm();
      return;
    }

    // Successful password change
    setSuccess("Le mot de passe a été changé avec succès !");
    resetForm();
  };

  // Function to reset the form fields
  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <CContainer className="mt-4 mb-5">
      <CRow className="justify-content-center">
        <CCol md="8">
          <CCard className="mt-4">
            <CCardBody>
              {/* Success Message */}
              {success && <CAlert color="success" className="mb-4">{success}</CAlert>}

              <h5 className="mb-4">Changer le Mot de Passe</h5>

              <CForm onSubmit={handleSubmit}>
                {/* Current Password */}
                <div className="mb-4">
                  <CFormInput
                    type="password"
                    id="currentPassword"
                    placeholder="Mot de Passe Actuel"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                {/* New Password */}
                <div className="mb-4 position-relative">
                  <CFormInput
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="Nouveau Mot de Passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <div
                    className="position-absolute"
                    style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="mb-4 position-relative">
                  <CFormInput
                    type={showConfirmNewPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    placeholder="Confirmer le Nouveau Mot de Passe"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                  <div
                    className="position-absolute"
                    style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  >
                    {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                {/* Error Message */}
                {error && <CAlert color="danger">{error}</CAlert>}

                {/* Submit Button */}
                <CRow className="text-center">
                  <CCol>
                    <CButton color="primary" type="submit" className="mt-3 rounded-0 px-5">
                      Changer le Mot de Passe
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ChangePassword;
