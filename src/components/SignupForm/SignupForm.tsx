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
};

function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    nickname: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
    try {
      // Your form submission logic
      console.log(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <TextField
        label="Nickname"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
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
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
}

export default SignupForm;
