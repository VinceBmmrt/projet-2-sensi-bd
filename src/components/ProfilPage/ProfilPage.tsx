import React, { useState } from 'react';
import axios from 'axios';

import {
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { handleLogout } from '../../store/reducers/user';
import { useAppDispatch } from '../../hooks/redux';

function EditableField({ label, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(fieldValue);
    setIsEditing(false);
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle1">{label}</Typography>
      {isEditing ? (
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <IconButton onClick={handleSaveClick}>
            <EditIcon />
          </IconButton>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{value}</Typography>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </Grid>
  );
}

async function postImage({ image, description, avatarSrc }) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
  }
  formData.append('description', description);

  if (image) {
    try {
      const result = await axios.post(
        'http://localhost:3000/images',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(result.data);

      return result.data;
    } catch (error) {
      console.error('Error uploading the image', error);
      throw error;
    }
  } else {
    return null;
  }
}

function UserProfilePage() {
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    pseudonym: 'johndoe123',
    email: 'johndoe@example.com',
    credits: 100,
    postedAds: 5,
    full_address: '4, rue de la brasserie, Nantes, France',
  });
  const [avatarSrc, setAvatarSrc] = useState('/path/to/avatar.jpg'); // Initial avatar source
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useAppDispatch();

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveClick = async (event) => {
    // Ajoutez ici la logique de sauvegarde des modifications
    event.preventDefault();
    try {
      const result = await postImage({ image: file, description });
      const imageUrl = result.location; // Assurez-vous que 'location' est la clé retournée par votre serveur avec l'URL de l'image
      setImages([imageUrl, ...images]);
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image", error);
      // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
    }
    console.log('newInfo', userData);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setFile(file);

    // Update the avatar source dynamically
    setAvatarSrc(URL.createObjectURL(file));

    // Handle the file upload logic here
    console.log('Uploaded file:', file);
  };
  const handleDisconnect = (
    event: MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    dispatch(handleLogout());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        style={{
          padding: 16,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <Avatar
            alt="User Avatar"
            src={avatarSrc} // Set the src dynamically
            sx={{
              width: 100,
              height: 100,
              marginBottom: 2,
              margin: 'auto',
              cursor: 'pointer',
            }}
          />
        </label>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {userData.pseudonym}
          </Typography>
          <Typography>
            Crédits: {userData.credits} | Annonces postées: {userData.postedAds}
          </Typography>
        </div>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Récapitulatif des informations
          </Typography>
          <Typography>Prénom: {userData.firstName}</Typography>
          <Typography>Nom: {userData.lastName}</Typography>
          <Typography>Pseudo: {userData.pseudonym}</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Typography>Addresse: {userData.full_address}</Typography>
        </div>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          <EditableField
            label="Prénom"
            value={userData.firstName}
            onSave={(value) => handleInputChange('firstName', value)}
          />
          <EditableField
            label="Nom"
            value={userData.lastName}
            onSave={(value) => handleInputChange('lastName', value)}
          />
          <EditableField
            label="Pseudo"
            value={userData.pseudonym}
            onSave={(value) => handleInputChange('pseudonym', value)}
          />
          <EditableField
            label="Adresse email"
            value={userData.email}
            onSave={(value) => handleInputChange('email', value)}
          />
          <EditableField
            label="Adresse"
            value={userData.full_address}
            onSave={(value) => handleInputChange('full_address', value)}
          />
        </Grid>

        <div
          style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
        >
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Enregistrer les modifications
          </Button>
        </div>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link to="/mes-annonces">Mes annonces</Link>
          <span style={{ margin: '0 8px' }}>|</span>
          <Link to="/mes-favoris">Mes favoris</Link>
          <span style={{ margin: '0 8px' }}>|</span>
          <Link to="/" onClick={handleDisconnect}>
            Me déconnecter
          </Link>
        </div>
      </Paper>
    </Box>
  );
}

export default UserProfilePage;
