import React from "react";
import { Navigate } from "react-router-dom";

// Vérification de l'authentification
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');  // Récupérer le jeton du localStorage
  console.log('token', token);

  // Si le jeton est présent, rendre les enfants (children)
  return token ? children : <Navigate to="/" />;  // Sinon, redirection vers la page de login
};

export default PrivateRoute;