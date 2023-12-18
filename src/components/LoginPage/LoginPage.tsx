import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCredentialValue, login } from '../../store/reducers/user';
import CustomToast from '../CustomToast/CustomToast';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const emailValue = useAppSelector((state) => state.user.credentials.email);
  const passwordValue = useAppSelector(
    (state) => state.user.credentials.password
  );
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  // const checkedValue = useAppSelector((state) => state.user.checked);

  // useEffect(() => {
  //   dispatch(getCredentialsFromStorage());
  // }, [dispatch]);

  const handleChangeEmail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    dispatch(
      changeCredentialValue({
        textfieldName: 'email',
        value: newValue,
      })
    );
  };

  const handleChangePassword = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    dispatch(
      changeCredentialValue({
        textfieldName: 'password',
        value: newValue,
      })
    );
  };

  // const handleChangeRememberMe = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   dispatch(changeCheckedValue());
  // };

  const handleSignIn = async (event) => {
    event.preventDefault();

    // Logique de connexion ici
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);

    // Stockage local (localStorage) - à ajuster selon vos besoins
    // if (checkedValue) {
    //   localStorage.setItem('Email', emailValue);
    //   localStorage.setItem('Password', passwordValue);
    // } else {
    //   localStorage.removeItem('Email');
    //   localStorage.removeItem('Password');
    // }

    // Autres actions de connexion...
    const credentials = { email: emailValue, password: passwordValue };

    try {
      const data = await dispatch(login(credentials));
      console.log('🚀 ~ data:', data.error);

      setSuccessOpen(true);
      setTimeout(() => {
        window.location.replace('/');
      }, 2000);
    } catch (error) {
      setErrorOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailValue}
            onChange={handleChangeEmail}
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
            value={passwordValue}
            onChange={handleChangePassword}
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={checkedValue}
                onChange={handleChangeRememberMe}
                inputProps={{ 'aria-label': 'se souvenir de moi' }}
              />
            }
            label="Se souvenir de moi"
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#95C23D', // Change this to the desired color
              '&:hover': {
                backgroundColor: '#7E9D2D', // Change this to the desired hover color
              },
            }}
            onClick={handleSignIn}
          >
            se connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Pas encore de compte? Inscrivez-vous !
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CustomToast
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        severity="success"
      >
        Connexion réussie !
      </CustomToast>
      <CustomToast
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        severity="error"
      >
        Identifiant ou mot de passe incorrect
      </CustomToast>
    </Container>
  );
}
