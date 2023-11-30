import { Outlet } from 'react-router-dom';

import './App.scss';
import SimpleBottomNavigation from '../BottomNav/BottomNav';

function App() {
  return (
    <div className="App">
      <Outlet />
      <SimpleBottomNavigation />
    </div>
  );
}

export default App;
