import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

// import axios from 'axios';
const googlePlacesApiKey: string = import.meta.env
  .REACT_APP_GOOGLE_PLACES_API_KEY;
type FormDataT = {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
};

function SignupForm() {
  const [formData, setFormData] = useState<FormDataT>({
    firstname: '',
    lastname: '',
    nickname: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response = await axios.post('/api/signup', formData);
      console.log(formData); // Handle the response as needed
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
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
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
