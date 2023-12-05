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
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '../../assets/leaf_color.png';
import leafIcon from '../../../public/feuille.png';
import './appHeader.scss';

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

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };
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
        <form className="header__searchContainer-searchBar">
          <TextField
            variant="outlined"
            placeholder="ouvrage, code postal, ville"
            InputProps={{
              startAdornment: (
                <SearchIcon
                  color="action"
                  sx={{ color: theme.palette.common.black }}
                />
              ),
            }}
          />
        </form>
        <div className="header__searchContainer-filterButton">
          <IconButton
            sx={{ color: theme.palette.common.black }}
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
