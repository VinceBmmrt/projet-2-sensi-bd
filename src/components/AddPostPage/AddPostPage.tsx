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
import axios from 'axios';

// coté back :
// post_title, slug, description, image, book_title, book_author, user_id, category_id, audience_id, condition_id
type FormData = {
  post_title: string;
  description: string;
  book_title: string;
  book_author: string;
  image: File[];
  category_id: number | null;
  audience_id: number | null;
  condition_id: number | null;
  slug: string;
};

function AddPostPage() {
  const [formData, setFormData] = useState<FormData>({
    post_title: '',
    description: '',
    book_title: '',
    book_author: '',
    image: [],
    category_id: null,
    audience_id: null,
    condition_id: null,
    slug: '',
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
        image: [...prevData.image, ...Array.from(files)],
      }));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prevData) => {
      const updatedPhotos = [...prevData.image];
      updatedPhotos.splice(index, 1);
      return {
        ...prevData,
        image: updatedPhotos,
      };
    });
  };

  const handleCheckboxChange = (category: keyof FormData, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category] === value ? '' : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    try {
      axios
        .post('http://localhost:3000/post', {
          ...formData,
        })
        .then((response) => {
          console.log('🚀 ~ Response:', response.data);

          setTimeout(() => {
            window.location.replace('/');
          }, 2000);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête POST:', error);
        });
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
    }
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
                value={formData.post_title}
                onChange={handleInputChange('post_title')}
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
                value={formData.book_author}
                onChange={handleInputChange('book_author')}
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
            {formData.image.map((photo, index) => (
              <Grid item xs={3} key={index}>
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`annonce ${index + 1}`}
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
                <h3>Catégorie</h3>
                {/* //1=BD  2 = livre 3=Magasine */}
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.category_id === 3}
                        onChange={() => handleCheckboxChange('category_id', 3)}
                      />
                    }
                    label="Magazine"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.category_id === 2}
                        onChange={() => handleCheckboxChange('category_id', 2)}
                      />
                    }
                    label="Livre"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.category_id === 1}
                        onChange={() => handleCheckboxChange('category_id', 1)}
                      />
                    }
                    label="Bande dessinée"
                  />
                </FormGroup>
              </div>
              <div>
                <h3>Audience</h3>
                {/* 1 = tout public 2 = jeunesse */}
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.audience_id === 1}
                        onChange={() => handleCheckboxChange('audience_id', 1)}
                      />
                    }
                    label="Tout public"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.audience_id === 2}
                        onChange={() => handleCheckboxChange('audience_id', 2)}
                      />
                    }
                    label="Jeunesse"
                  />
                </FormGroup>
              </div>
              <div>
                <h3>Condition</h3>
                {/* 1 = neuf  2= légerement abimé 3 = abimé   */}
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.condition_id === 1}
                        onChange={() => handleCheckboxChange('condition_id', 1)}
                      />
                    }
                    label="Comme  neuf"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.condition_id === 2}
                        onChange={() => handleCheckboxChange('condition_id', 2)}
                      />
                    }
                    label="Bon état"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.condition_id === 3}
                        onChange={() => handleCheckboxChange('condition_id', 3)}
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
