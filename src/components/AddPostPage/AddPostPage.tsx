import React, { ChangeEvent, FormEvent, useState } from 'react';
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

type FormData = {
  title: string;
  description: string;
  book_title: string;
  author: string;
  photos: File[];
  bookType: string;
  age: string;
  status: string;
};

function AddPostPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    book_title: '',
    author: '',
    photos: [],
    bookType: '',
    age: '',
    status: '',
  });

  const handleInputChange =
    (field: keyof FormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: event.target.value,
      }));
    };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...Array.from(files)],
      }));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prevData) => {
      const updatedPhotos = [...prevData.photos];
      updatedPhotos.splice(index, 1);
      return {
        ...prevData,
        photos: updatedPhotos,
      };
    });
  };

  const handleCheckboxChange = (category: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category] === value ? '' : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);
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
                value={formData.title}
                onChange={handleInputChange('title')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description de l'annonce"
                multiline
                rows={4}
                fullWidth
                value={formData.description}
                onChange={handleInputChange('description')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Titre de l'ouvrage"
                multiline
                rows={4}
                fullWidth
                value={formData.book_title}
                onChange={handleInputChange('book_title')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Auteur de l'ouvrage"
                multiline
                rows={4}
                fullWidth
                value={formData.author}
                onChange={handleInputChange('author')}
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
            {formData.photos.map((photo, index) => (
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
            <Grid
              item
              // xs={12}
              // style={{
              //   display: 'flex',
              //   flexDirection: 'column',
              // }}
              sx={{
                // Styles pour les écrans extra petits (xs) à moyens (md)
                '@media (max-width:600px)': {
                  display: 'flex',
                  flexDirection: 'column',
                },
                // Styles pour les écrans larges (lg) et très larges (xl)
                '@media (min-width:1200px)': {
                  display: 'flex',
                  flexDirection: 'row',
                },
              }}
            >
              <div>
                <h3>Type d'ouvrage</h3>
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
                        checked={formData.bookType === 'livre'}
                        onChange={() =>
                          handleCheckboxChange('bookType', 'livre')
                        }
                      />
                    }
                    label="Livre"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.bookType === 'bd'}
                        onChange={() => handleCheckboxChange('bookType', 'bd')}
                      />
                    }
                    label="Bande dessinée"
                  />
                </FormGroup>
              </div>
              <div>
                <h3>Age</h3>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.age === 'tous'}
                        onChange={() => handleCheckboxChange('age', 'tous')}
                      />
                    }
                    label="Adulte"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.age === 'enfant'}
                        onChange={() => handleCheckboxChange('age', 'enfant')}
                      />
                    }
                    label="enfant"
                  />
                </FormGroup>
              </div>
              <div>
                <h3>Status</h3>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.status === 'neuf'}
                        onChange={() => handleCheckboxChange('status', 'neuf')}
                      />
                    }
                    label="Comme  neuf"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.status === 'bon'}
                        onChange={() => handleCheckboxChange('status', 'bon')}
                      />
                    }
                    label="Bon état"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.status === 'abime'}
                        onChange={() => handleCheckboxChange('status', 'abime')}
                      />
                    }
                    label="Abimé"
                  />
                </FormGroup>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Publier
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddPostPage;
