import { Alert, AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

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
  // const googlePlacesAPIKey = import.meta.env
  //   .VITE_REACT_APP_GOOGLE_PLACES_API_KEY;
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
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
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
    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      // Optionally, you can show an error message to the user

      setFormData((prevData) => ({
        ...prevData,
        error: true,
      }));
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
        ref={placesRef}
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
