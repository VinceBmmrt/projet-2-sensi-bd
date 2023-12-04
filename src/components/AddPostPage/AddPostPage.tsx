import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function AddPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [bookType, setBookType] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    distance: 5,
    bookType: '',
    age: '',
    status: '',
  });
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
  const handleCheckboxChange = (category, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category] === value ? '' : value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Photos:', photos);
    console.log('FormCheckbox:', formData);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Publier une Annonce
      </Typography>
      <Paper elevation={3} style={{ padding: 16, marginBottom: 16 }}>
        <form onSubmit={handleSubmit}>
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
              <div>
                <h3>Book Types</h3>

                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.bookType === 'magazine'}
                        onChange={() =>
                          handleCheckboxChange('bookType', 'magazine')
                        }
                      />
                    }
                    label="Magazine"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.bookType === 'book'}
                        onChange={() =>
                          handleCheckboxChange('bookType', 'book')
                        }
                      />
                    }
                    label="Book"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.bookType === 'comics'}
                        onChange={() =>
                          handleCheckboxChange('bookType', 'comics')
                        }
                      />
                    }
                    label="Comics"
                  />
                </FormGroup>
              </div>
              <div>
                <h3>Age</h3>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.age === 'adult'}
                        onChange={() => handleCheckboxChange('age', 'adult')}
                      />
                    }
                    label="adult"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.age === 'kid'}
                        onChange={() => handleCheckboxChange('age', 'kid')}
                      />
                    }
                    label="kid"
                  />
                </FormGroup>
              </div>
              <div>
                <h3>Status</h3>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.status === 'good'}
                        onChange={() => handleCheckboxChange('status', 'good')}
                      />
                    }
                    label="good"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.status === 'ok'}
                        onChange={() => handleCheckboxChange('status', 'ok')}
                      />
                    }
                    label="ok"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.status === 'bad'}
                        onChange={() => handleCheckboxChange('status', 'bad')}
                      />
                    }
                    label="bad"
                  />
                </FormGroup>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Publier lannonce
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddPostPage;
