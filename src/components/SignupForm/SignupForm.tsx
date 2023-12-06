import { Alert, AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState, ChangeEvent, FormEvent, LegacyRef } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import bcrypt from 'bcryptjs';

type FormData = {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
  error: boolean;
};

function SignupForm() {
  const googlePlacesAPIKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [userFormData, setUserFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    nickname: '',
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
        lat: location.lat,
        lng: location.lng,
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

  const { ref: placesRef, autocompleteRef } = usePlacesWidget({
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
      console.log('🚀 ~ adressData:', addressData);
      console.log('🚀 ~ userFormData:', userFormData);
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
    }
    // Check if password and confirmPassword match
    if (userFormData.password !== userFormData.confirmPassword) {
      console.error('Passwords do not match');

      setUserFormData((prevData) => ({
        ...prevData,
        error: true,
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ paddingTop: '20px' }}>
        <TextField
          label="First Name"
          name="firstname"
          value={userFormData.firstname}
          onChange={handleChange}
          required
          sx={{ mb: 2 }} // Add margin-bottom for spacing
        />
      </div>
      <TextField
        label="Last Name"
        name="lastname"
        value={userFormData.lastname}
        onChange={handleChange}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      <TextField
        label="Nickname"
        name="nickname"
        value={userFormData.nickname}
        onChange={handleChange}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={userFormData.email}
        onChange={handleChange}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      {/* Use the placesRef for the input field */}
      <input
        ref={placesRef as unknown as LegacyRef<HTMLInputElement>}
        placeholder="Address"
        autoComplete="off"
        name="address"
        type="text"
        onChange={handleChange}
        value={userFormData.address}
        required
        style={{ marginBottom: '16px' }} // Add margin-bottom for spacing
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={userFormData.password}
        onChange={handleChange}
        inputProps={{
          pattern: passwordRegex.source,
          title:
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        }}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      <TextField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={userFormData.confirmPassword}
        onChange={handleChange}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      {userFormData.error && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Passwords do not match — <strong>check it out!</strong>
        </Alert>
      )}
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
}

export default SignupForm;
