import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment, InputLabel, FormControl, OutlinedInput, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AdminProfileUpdate = () => {
  // État pour les champs du formulaire
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // État pour afficher ou masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Gestionnaire de changement des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation pour vérifier si les mots de passe correspondent
    if (formValues.password !== formValues.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Logique de soumission ici (ex : appel API pour mettre à jour le profil)
    console.log('Profile updated:', formValues);
  };

  // Gestionnaire pour afficher ou masquer le mot de passe
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Gestionnaire d'annulation
  const handleCancel = () => {
    // Réinitialiser le formulaire ou naviguer vers une autre page
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Container component="main" maxWidth="md"> {/* Changer maxWidth pour élargir la boîte */}
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%', // Largeur de la boîte à 100% de son conteneur
          maxWidth: 800, // Largeur maximale de la boîte
          padding: 3, // Padding interne de la boîte
        }}
      >
        <Typography component="h1" variant="h5"  sx={{
           marginBottom: 5,
          }}>
          Update My Profile
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: '100%', // Largeur du formulaire à 100% de son conteneur
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formValues.name}
                onChange={handleChange}
                autoFocus
                sx={{ width: '100%' }} // Élargir le champ à 100% de la largeur de la grille
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                sx={{ width: '100%' }} // Élargir le champ à 100% de la largeur de la grille
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{ width: '100%' }} // Élargir le champ à 100% de la largeur de la grille
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  sx={{ width: '100%' }} // Élargir le champ à 100% de la largeur de la grille
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: { xs: '100%', sm: '250px' }, // Largeur responsive
                height: '40px', // Hauteur du bouton
                mb: 2, // Marge en bas
              }}
            >
              Update Profile
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              sx={{
                width: { xs: '100%', sm: '250px' }, // Largeur responsive
                height: '40px', // Hauteur du bouton
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminProfileUpdate;
