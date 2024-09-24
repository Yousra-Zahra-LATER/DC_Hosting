import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const location = useLocation();

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {refresh: refreshToken });
      const { access } = response.data;
      console.log('new token généré:', access);
      localStorage.setItem('access_token', access);
      return access;
    } catch (error) {
      console.log('Erreur lors du rafraîchissement du token:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        console.log('token pas présent');
        setIsAuthenticated(false);
        return <Navigate to="/" />;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log('token expiré, rafraîchissement...');
          const newToken = await refreshAccessToken();
          if (!newToken) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } else {
          console.log('token valide');
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('token invalide');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [token, location.pathname]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
