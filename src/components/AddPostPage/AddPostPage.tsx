import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { axiosInstance } from '../../utils/axios';
import { useAppSelector } from '../../hooks/redux';
import CustomToast from '../CustomToast/CustomToast';

type FormData = {
  post_title: string;
  description: string;
  book_title: string;
  book_author: string;
  image: File | null;
  category_id: number | null;
  audience_id: number | null;
  condition_id: number | null;
  user_id: number | undefined;
  slug: string;
  file: File | null; // New state for managing the selected file
};

const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

type FileData = { file: File | null; description: string };
async function postImage({ file, description }: FileData) {
  const imgFormData = new FormData();

  if (file) {
    imgFormData.append('image', file);
  }
  imgFormData.append('description', description);

  if (file) {
    const result = await axiosInstance.post(
      'http://localhost:3000/images',
      imgFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return result.data;
  }
  return null;
}

function AddPostPage() {
  const [formData, setFormData] = useState<FormData>({
    post_title: '',
    description: '',
    book_title: '',
    book_author: '',
    image: null,
    category_id: null,
    audience_id: null,
    condition_id: null,
    slug: '',
    user_id: undefined,
    file: null, // Initialize the file state
  });
  const userId = useAppSelector((state) => state.user.userId);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      user_id: userId,
    }));
  }, [userId]);

  const handleInputChange =
    (field: keyof FormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: event.target.value,
      }));
    };

  const handletitleAndSlugChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    const inputValueSlug = slugify(inputValue);
    console.log(inputValue);
    console.log(inputValueSlug);
    setFormData((prevData) => ({
      ...prevData,
      post_title: event.target.value,
      slug: inputValueSlug,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
  };

  const handleCheckboxChange = (category: keyof FormData, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category] === value ? '' : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Pass the file and description to the postImage function
      const result = await postImage({
        file: formData.file,
        description: formData.description,
      });

      const imageUrl = result.location;
      console.log('Image URL:', imageUrl);

      // Further logic based on the server response
      await axiosInstance
        .post('/posts', {
          ...formData,
        })
        .then((response) => {
          if (response && response.status >= 200 && response.status < 300) {
            console.log('Request was successful:', response.data);
            setSuccessOpen(true);
            setTimeout(() => {
              window.location.replace('/');
            }, 2000);
          } else {
            console.log(
              'Request was not successful. Status code:',
              response.status
            );
          }
        });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="postForm" style={{ padding: '1rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Publier une Annonce
      </Typography>
      <div style={{ marginBottom: 16 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titre de l'annonce"
                fullWidth
                value={formData.post_title}
                onChange={handletitleAndSlugChange}
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
                style={{ display: 'none' }}
                id="photo-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="photo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AddIcon />}
                >
                  Ajouter une photo
                </Button>
              </label>
            </Grid>
            {formData.file && (
              <Grid item xs={3}>
                <img
                  src={URL.createObjectURL(formData.file)}
                  alt="votre ouvrage a importer"
                  style={{ width: '100%', height: 'auto', marginBottom: 8 }}
                />
                <IconButton
                  onClick={() =>
                    setFormData((prevData) => ({ ...prevData, file: null }))
                  }
                >
                  <AddIcon />
                </IconButton>
              </Grid>
            )}
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
                <h3>Catégories</h3>
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
                    label="jeunesse"
                  />
                </FormGroup>
              </div>
              <div>
                <h3>Condition</h3>
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  mb: 6,
                  backgroundColor: '#95C23D', // Change this to the desired color
                  '&:hover': {
                    backgroundColor: '#7E9D2D', // Change this to the desired hover color
                  },
                }}
              >
                Publier
              </Button>
            </Grid>
          </Grid>
        </form>
        <CustomToast
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          severity="success"
        >
          Connexion réussie !
        </CustomToast>
      </div>
    </div>
  );
}

export default AddPostPage;
