import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function AddPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoUpload = (e) => {
    const { files } = e.target;
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Photos:', photos);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Publier une Annonce
      </Typography>
      <Paper elevation={3} style={{ padding: 16, marginBottom: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Titre de l'annonce"
              fullWidth
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description de l'annonce"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              id="photo-upload"
              onChange={handlePhotoUpload}
            />
            <label htmlFor="photo-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AddIcon />}
              >
                Ajouter des photos
              </Button>
            </label>
          </Grid>
          {photos.map((photo, index) => (
            <Grid item xs={3} key={index}>
              <img
                src={URL.createObjectURL(photo)}
                alt={`Photo ${index + 1}`}
                style={{ width: '100%', height: 'auto', marginBottom: 8 }}
              />
              <IconButton onClick={() => handleRemovePhoto(index)}>
                <AddIcon />
              </IconButton>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Publier lannonce
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AddPostPage;
