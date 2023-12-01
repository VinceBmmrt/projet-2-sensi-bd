import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import GooglePlacesAutocomplete from 'react-google-autocomplete';

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

  const handleAddressChange = (place) => {
    setFormData((prevData) => ({
      ...prevData,
      address: place.formatted_address,
    }));
  };

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
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBe1bXbz2e6IzfLTVygUgInpIVCu3DC4ko"
        selectProps={{
          onChange: handleAddressChange,
          placeholder: 'Start typing your address...',
        }}
        options={{
          types: ['address'],
          componentRestrictions: { country: 'FR' },
        }}
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
