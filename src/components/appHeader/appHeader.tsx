import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  TextField,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '../../assets/leaf_color.png';
import leafIcon from '../../../public/feuille.png';
import './appHeader.scss';
import { fetchPosts, setSearchText } from '../../store/reducers/posts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

type FilterData = {
  distance: number | number[];
  bookType: string;
  age: string;
  status: string;
  reserved: boolean;
};
function AppHeader() {
  const drawerWidth = 340;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.posts.searchText);

  const [formData, setFormData] = useState<FilterData>({
    distance: 5,
    bookType: '',
    age: '',
    status: '',
    reserved: false,
  });
  const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFormData({ ...formData, distance: newValue });
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category] === value ? '' : value,
    }));
  };

  // gestion de la barre de recherche et soumission du formulaire de recherche

  const handleSubmitSearchValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('formulaire soumis');
    dispatch(fetchPosts());
  };

  const handleChangeSearchValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setSearchText(event.target.value));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log('formulaire soumis');
  }

  return (
    <header className="header">
      <div className="header__topContainer">
        <div className="header__topContainer-logo-container">
          <Link to="/">
            <img
              src={logo}
              className="header__topContainer-logo"
              alt="Logo Leeaf"
            />
          </Link>
        </div>
        <div className="header__topContainer-credit">
          <div className="header__topContainer-credit-count">10</div>
          <Link to="/credits">
            <img
              src={leafIcon}
              className="header__topContainer-credit-logo"
              alt="Logo Leeaf"
            />
          </Link>
        </div>
      </div>
      <div className="header__searchContainer">
        <form
          className="header__searchContainer-searchBar"
          onSubmit={handleSubmitSearchValue}
        >
          <TextField
            variant="standard"
            placeholder="ouvrage, code postal, ville"
            value={searchText}
            onChange={handleChangeSearchValue}
            InputProps={{
              startAdornment: (
                <SearchIcon color="action" sx={{ color: '#555' }} />
              ),
            }}
          />
        </form>
        <div className="header__searchContainer-filterButton">
          <IconButton
            sx={{ color: '#555' }}
            aria-label="Filters"
            onClick={handleDrawerOpen}
          >
            <TuneIcon />
          </IconButton>
        </div>
      </div>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="drawer">
          <h2>Options de filtres</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Distance autour de chez vous</label>
              <Slider
                value={formData.distance}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} km`}
                max={10}
                sx={{
                  color: '#95C23D',
                }}
              />
            </div>
            <div className="drawer__categories">
              <h3>Catégories</h3>
              <FormGroup>
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
                      onChange={() => handleCheckboxChange('bookType', 'book')}
                    />
                  }
                  label="Livres"
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
                  label="Bande dsessinée"
                />
              </FormGroup>
            </div>
            <div className="drawer__audience">
              <h3>Age</h3>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.age === 'adult'}
                      onChange={() => handleCheckboxChange('age', 'adult')}
                    />
                  }
                  label="adultes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.age === 'kid'}
                      onChange={() => handleCheckboxChange('age', 'kid')}
                    />
                  }
                  label="enfants"
                />
              </FormGroup>
            </div>
            <div className="drawer__condition">
              <h3>Status</h3>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.status === 'good'}
                      onChange={() => handleCheckboxChange('status', 'good')}
                    />
                  }
                  label="Comme neuf"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.status === 'ok'}
                      onChange={() => handleCheckboxChange('status', 'ok')}
                    />
                  }
                  label="Bon état"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.status === 'bad'}
                      onChange={() => handleCheckboxChange('status', 'bad')}
                    />
                  }
                  label="Abimé"
                />
              </FormGroup>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#95C23D', // Change this to the desired color
                '&:hover': {
                  backgroundColor: '#7E9D2D', // Change this to the desired hover color
                },
              }}
            >
              Submit
            </Button>
          </form>
        </div>
        <Divider />
      </Drawer>
    </header>
  );
}

export default AppHeader;
