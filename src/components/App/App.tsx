import { Outlet } from 'react-router-dom';
import SimpleBottomNavigation from '../BottomNav/BottomNav';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Outlet />
      <SimpleBottomNavigation />
    </div>
  );
}

export default App;
