import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

import InputBase from '@mui/material/InputBase';
import TuneIcon from '@mui/icons-material/Tune';
import { BottomNavigationAction } from '@mui/material';
import logo from '../../assets/leaf_color.png';
import leafIcon from '../../../public/feuille.png';
import './appHeader.scss';
import Posts from '../Posts/Posts';

function appHeader() {
  // const handleSubmitSearchMessage: React.FormEventHandler<HTMLFormElement> | undefined(event: FormEvent<HTMLFormElement>) => {

  //   console.log('test');
  // }

  // const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
  //   const newValue = event.target.value;

  //   // J'emet l'intention de changer la valeur de mon input avec sa nouvelle valeur
  //   dispatch(changeInputValue(newValue));
  // };
  const Search = styled('div')(({ theme }) => ({
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
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    border: '1px solid grey',
    height: '100%',
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    // padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
          icon={<TuneIcon />}
          sx={{
            width: 300,
            color: 'blue',
            '& .MuiBottomNavigationAction-label': {
              opacity: 1,
            },
          }}
        />
      </div>
    </header>
  );
}

export default appHeader;
