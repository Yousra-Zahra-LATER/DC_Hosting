import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"; // Importer axios pour les requêtes HTTP
import login from "../assets/DC.png";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${login})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const navigate = useNavigate(); // Initialiser useNavigate pour rediriger

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Envoyer la requête POST pour obtenir le token JWT
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          email,
          password,
        });
      
        // Stocker le token JWT dans le localStorage si l'authentification réussit
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      
        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem("access_token");
      
        if (token) {
          // Faire la requête pour obtenir les détails de l'utilisateur
          const userDetailsResponse = await axios.post(
            "http://127.0.0.1:8000/hosting/userDetails/",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête
              },
            }
          );
      
          // Si la réponse contient des données utilisateur valides
          if (userDetailsResponse.data && userDetailsResponse.data.email) {
            const { first_name, last_name } = userDetailsResponse.data;
            // Rediriger vers la page principale après authentification réussie
            navigate("/dash", { state: { first_name, last_name } });
          } else {
            // Si la réponse est vide ou incorrecte, rediriger vers la page 401
            navigate("/401");
          }
        }
        else{
            //le token nexsite pas dans localstorage
            navigate("/401");
        }

        //le mot de passe ou password erronés 
       } catch (error) {
        setError("Email ou mot de passe incorrect");
        console.error(error);
      }
    }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Mettre à jour l'état
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && <Typography color="error">{error}</Typography>}{" "}
            {/* Afficher l'erreur */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
