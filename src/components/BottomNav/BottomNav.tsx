import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavorisIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

export default function LabelBottomNavigation() {
  return (
    <BottomNavigation
      showLabels
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Link to="/">
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} />
      </Link>
      <Link to="/favoris">
        <BottomNavigationAction label="Favoris" icon={<FavorisIcon />} />
      </Link>
      <Link to="/addPost">
        <BottomNavigationAction label="AddCircle" icon={<AddCircleIcon />} />
      </Link>
      <Link to="/messages">
        <BottomNavigationAction label="Messages" icon={<ChatBubbleIcon />} />
      </Link>

      <BottomNavigationAction label="Connexion" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
