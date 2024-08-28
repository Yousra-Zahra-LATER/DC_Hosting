import React, { useState, useEffect } from 'react';

// Fonction pour lire un cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export default function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Lire le cookie qui contient les données utilisateur
    const userDataCookie = getCookie('userData');
    
    if (userDataCookie) {
      setUserData(JSON.parse(decodeURIComponent(userDataCookie)));
      console.log('Données utilisateur:', JSON.parse(decodeURIComponent(userDataCookie)));
    } else {
      console.log('Aucun cookie trouvé, redirection vers la page de connexion.');
      // Redirige vers la page de connexion si les données utilisateur ne sont pas trouvées
      window.location.href = 'http://localhost:3000/auth/signin';
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome,</h1> <h3> {userData.email} !</h3>
          {/* Afficher d'autres informations utilisateur si nécessaire */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
