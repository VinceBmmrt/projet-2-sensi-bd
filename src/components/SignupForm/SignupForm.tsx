import { Alert, AlertTitle, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, LegacyRef } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import './SignupForm.scss';

type UserData = {
  firstname: string;
  lastname: string;
  pseudonym: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
  error: boolean;
};

function SignupForm() {
  const googlePlacesAPIKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const [userFormData, setUserFormData] = useState<UserData>({
    firstname: '',
    lastname: '',
    pseudonym: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    error: false,
  });

  const getCoordinates = async (address: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${googlePlacesAPIKey}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const { location } = data.results[0].geometry;
      return {
        full_adress: data.results[0].formatted_address,
        number: data.results[0].address_components[0].short_name,
        street: data.results[0].address_components[1].short_name,
        zipcode: data.results[0].address_components[6].short_name,
        city: data.results[0].address_components[2].short_name,
        country: data.results[0].address_components[5].long_name,
        latitude: location.lat,
        longitude: location.lng,
      };
    }
    throw new Error('Adresse non trouvée');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Reset the error state when passwords are updated
    if (name === 'password' || name === 'confirmPassword') {
      setUserFormData((prevData) => ({
        ...prevData,
        [name]: value,
        error: false,
      }));
    } else {
      setUserFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const { ref: placesRef } = usePlacesWidget({
    apiKey: googlePlacesAPIKey,
    onPlaceSelected: (place) => {
      // Update the address in the form data when a place is selected
      setUserFormData((prevData) => ({
        ...prevData,
        address: place.formatted_address,
      }));
    },
    options: {
      types: ['address'],
      componentRestrictions: { country: 'FR' },
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const addressData = await getCoordinates(userFormData.address);
      console.log('🚀 ~ userFormData:', userFormData);
      console.log('🚀 ~ adressData:', addressData);

      axios.post('http://localhost:3000/users', { userFormData, addressData });
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
    }
    // Check if password and confirmPassword match
    if (userFormData.password !== userFormData.confirmPassword) {
      console.error('Passwords match incorrect');

      setUserFormData((prevData) => ({
        ...prevData,
        error: true,
      }));
    }
  };

  return (
    <div className="signupForm">
      <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
        Inscription
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <TextField
            className="signupForm__input"
            label="Prénom (non visible sur le site)"
            name="firstname"
            value={userFormData.firstname}
            InputProps={{
              inputProps: {
                minLength: 2,
                maxLength: 20,
              },
            }}
            onChange={handleChange}
            required
            sx={{ marginBottom: '1rem' }}
          />
        </div>
        <TextField
          label="Nom (non visible sur le site)"
          name="lastname"
          value={userFormData.lastname}
          InputProps={{
            inputProps: {
              minLength: 2,
              maxLength: 20,
            },
          }}
          onChange={handleChange}
          required
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Pseudo"
          name="pseudonym"
          value={userFormData.pseudonym}
          InputProps={{
            inputProps: {
              minLength: 2,
              maxLength: 20,
            },
          }}
          onChange={handleChange}
          required
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={userFormData.email}
          InputProps={{
            inputProps: {
              pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
            },
          }}
          onChange={handleChange}
          required
          sx={{ marginBottom: '1rem' }}
        />
        <input
          ref={placesRef as unknown as LegacyRef<HTMLInputElement>}
          className="signupForm__address"
          placeholder="Addresse*"
          autoComplete="off"
          name="address"
          type="text"
          onChange={handleChange}
          value={userFormData.address}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={userFormData.password}
          onChange={handleChange}
          inputProps={{
            pattern:
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
          }}
          required
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Confirmez le password"
          type="password"
          name="confirmPassword"
          value={userFormData.confirmPassword}
          onChange={handleChange}
          required
          sx={{ marginBottom: '1rem' }}
        />
        {userFormData.error && (
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Les passwords indiqués ne correspondent pas !
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#95C23D', // Change this to the desired color
            '&:hover': {
              backgroundColor: '#7E9D2D', // Change this to the desired hover color
            },
          }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignupForm;
