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
  const [formData, setFormData] = useState<FormData>({
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
    console.log('🚀 ~ data:', data);

    if (data.results.length > 0) {
      const { location } = data.results[0].geometry;
      return { lat: location.lat, lng: location.lng };
    }
    throw new Error('Adresse non trouvée');
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Reset the error state when passwords are updated
    if (name === 'password' || name === 'confirmPassword') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        error: false,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const { ref: placesRef, autocompleteRef } = usePlacesWidget({
    apiKey: googlePlacesAPIKey,
    onPlaceSelected: (place) => {
      // Update the address in the form data when a place is selected
      setFormData((prevData) => ({
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

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const addressParts = formData.address.split(',').map((part) => part.trim());
    // Assurez-vous que l'adresse a au moins trois parties (rue, ville, pays)
    if (addressParts.length >= 3) {
      const [streetWithNumber, postalCodeCity, country] = addressParts;
      // Sépare le numéro de rue et le nom de rue
      const streetParts = streetWithNumber.split(' ');
      const streetNumber = streetParts.shift(); // Premier élément est le numéro de rue
      const streetName = streetParts.join(' '); // Les éléments restants sont le nom de rue
      // Sépare le code postal et la ville
      const [postalCode, city] = postalCodeCity.split(' ');
      console.log('🚀 ~ formData.address:', formData.address);
      console.log('Numéro de Rue :', streetNumber);
      console.log('Nom de Rue :', streetName);
      console.log('Code Postal :', postalCode);
      console.log('Ville :', city);
      console.log('Pays :', country);
    } else {
      console.error("Format d'adresse invalide");
    }

    try {
      const coordinates = await getCoordinates(formData.address);

      console.log('Coordonnées:', coordinates);
      // Vous pouvez faire quelque chose avec les coordonnées, par exemple, les stocker dans le state
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
    }
    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      // Optionally, you can show an error message to the user

      setFormData((prevData) => ({
        ...prevData,
        error: true,
      }));

      // Utilisez hashedPassword dans votre logique d'envoi au backend
      try {
        console.log('Mot de passe hashé :', hashedPassword);

        // ... (autres logiques d'envoi au backend)
      } catch (error) {
        console.error("Erreur lors de l'envoi au backend :", error);
      }
      return;
    }

    try {
      // Your form submission logic
      console.log(formData);

      console.log('🚀 ~   formData.error:', formData.error);
    } catch (error) {
      console.error('Error submitting form:', error);
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
          value={formData.firstname}
          onChange={handleChange}
          required
          sx={{ mb: 2 }} // Add margin-bottom for spacing
        />
      </div>
      <TextField
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      <TextField
        label="Nickname"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
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
        value={formData.address}
        required
        style={{ marginBottom: '16px' }} // Add margin-bottom for spacing
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
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
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        sx={{ mb: 2 }} // Add margin-bottom for spacing
      />
      {formData.error && (
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
