import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AddPostPage from './components/AddPostPage/AddPostPage';
import SignupForm from './components/SignupForm/SignupForm';


// eslint-disable-next-line import/prefer-default-export
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {

        path: '/addpost',
        element: <AddPostPage />,
      },
      {
         path: '/signup',
        element: <SignupForm />,
      },
    ],
  },
]);
