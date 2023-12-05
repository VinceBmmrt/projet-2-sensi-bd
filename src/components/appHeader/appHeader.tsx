import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

import InputBase from '@mui/material/InputBase';
import TuneIcon from '@mui/icons-material/Tune';
import {
  BottomNavigationAction,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '../../assets/leaf_color.png';
import leafIcon from '../../../public/feuille.png';
import './appHeader.scss';
import Posts from '../Posts/Posts';

type FilterData = {
  distance: number | number[];
  bookType: string;
  age: string;
  status: string;
  reserved: boolean;
};
function AppHeader() {
  // const handleSubmitSearchMessage: React.FormEventHandler<HTMLFormElement> | undefined(event: FormEvent<HTMLFormElement>) => {

  //   console.log('test');
  // }

  // const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
  //   const newValue = event.target.value;

  //   // J'emet l'intention de changer la valeur de mon input avec sa nouvelle valeur
  //   dispatch(changeInputValue(newValue));
  // };
  const drawerWidth = 340;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [distanceFilterValue, setDistanceFilterValue] = useState<number[]>([
    5, 50,
  ]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const Search = styled('div')(() => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      border: '1px solid green',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '100%', // Ajustez la hauteur selon vos préférences
    alignItems: 'center', // Alignement vertical du contenu
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    border: '1px solid grey',
  }));

  const SearchIconWrapper = styled('div')(() => ({
    padding: theme.spacing(0, 0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(() => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      // padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const handleChangeDistanceFilterValue = (
  //   event: Event,
  //   newValue: number | number[]
  // ) => {
  //   setDistanceFilterValue(newValue as number[]);
  //   console.log(distanceFilterValue);
  // };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFormData({ ...formData, distance: newValue });
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category] === value ? '' : value,
    }));
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };
  return (
    <header className="header">
      <div className="header__topContainer">
        <div className="header__topContainer-logo-container">
          <img
            src={logo}
            className="header__topContainer-logo"
            alt="Logo Leeaf"
            style={{ width: '7rem', height: 'auto' }}
          />
        </div>
        <div className="header__topContainer-credit">
          <div className="header__topContainer-creditCount">9999</div>
          <img
            src={leafIcon}
            className="header__topContainer-creditLogo"
            alt="Logo Leeaf"
            style={{ maxWidth: '50%', width: '100%', height: 'auto' }}
          />
        </div>
      </div>

      <div className="header__searchContainer">
        <form className="form">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </form>
        <BottomNavigationAction
          className="header__topContainer__filterButton"
          label="Filtres"
          icon={<TuneIcon style={{ fontSize: 18 }} />}
          onClick={handleDrawerOpen}
          sx={{
            ...(open && { display: 'none' }),

            color: 'blue',

            padding: 0,

            '& .MuiBottomNavigationAction-label': {
              opacity: 1,
            },
          }}
        />
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
        <div>
          <h2>Filter Options</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Distance Range</label>
              <Slider
                value={formData.distance}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} km`}
                max={10}
              />
            </div>
            <div>
              <h3>Book Types</h3>
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
              <FormGroup>
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
              <FormGroup>
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
            <div>
              <h3>Reserved</h3>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Reserved"
                  onChange={() => handleCheckboxChange('reserved', true)}
                />
              </FormGroup>
            </div>
            <Button type="submit" variant="contained" color="primary">
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
