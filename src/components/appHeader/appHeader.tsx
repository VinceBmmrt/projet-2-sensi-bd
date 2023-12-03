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
  IconButton,
  Slider,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '../../assets/leaf_color.png';
import leafIcon from '../../../public/feuille.png';
import './appHeader.scss';
import Posts from '../Posts/Posts';
import RangeSlider from '../RangeSlider/RangeSlider';

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
  const handleChangeDistanceFilterValue = (
    event: Event,
    newValue: number | number[]
  ) => {
    setDistanceFilterValue(newValue as number[]);
    console.log(distanceFilterValue);
  };
  return (
    <header className="header">
      <div className="header__topContainer">
        <img
          src={logo}
          className="header__topContainer-logo"
          alt="Logo Leeaf"
        />
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
          className="customLabelColor"
          label="Filtres"
          icon={<TuneIcon style={{ fontSize: 18 }} />}
          onClick={handleDrawerOpen}
          sx={{
            ...(open && { display: 'none' }),
            width: 200,
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <RangeSlider
            value={distanceFilterValue}
            onChange={handleChangeDistanceFilterValue}
            valueLabelDisplay="auto"
            // the getAriaValueText function is called to generate the corresponding text representation of the value. This generated text is then used by screen readers to announce the current value to the user.
            getAriaValueText={(value: number) => `${value} Kilometers`}
          />

          <FormControlLabel
            control={
              <Checkbox
                // checked={}
                // onChange={}
                inputProps={{ 'aria-label': 'Categorie' }}
              />
            }
            label="Categorie"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={}
          >
            Valider les filtres
          </Button>
        </Box>
        <Divider />
      </Drawer>
    </header>
  );
}

export default AppHeader;
