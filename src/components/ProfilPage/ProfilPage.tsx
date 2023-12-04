import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Link,
  Button,
  Grid,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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

function UserProfilePage() {
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    credits: 100,
    postedAds: 5,
  });
  const [avatarSrc, setAvatarSrc] = useState('/path/to/avatar.jpg'); // Initial avatar source

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveClick = () => {
    // Ajoutez ici la logique de sauvegarde des modifications
    console.log('newInfo', userData);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Update the avatar source dynamically
    setAvatarSrc(URL.createObjectURL(file));

    // Handle the file upload logic here
    console.log('Uploaded file:', file);
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
            {userData.username}
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
          <Typography>Pseudo: {userData.username}</Typography>
          <Typography>Email: {userData.email}</Typography>
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
            value={userData.username}
            onSave={(value) => handleInputChange('username', value)}
          />
          <EditableField
            label="Adresse email"
            value={userData.email}
            onSave={(value) => handleInputChange('email', value)}
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
          <Link href="/mes-annonces">Mes annonces</Link>
          <span style={{ margin: '0 8px' }}>|</span>
          <Link href="/mes-favoris">Mes favoris</Link>
          <Link href="/">Me déconnecter</Link>
        </div>
      </Paper>
    </Box>
  );
}

export default UserProfilePage;
