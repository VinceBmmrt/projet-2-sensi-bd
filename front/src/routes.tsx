import { createBrowserRouter } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/recipes/:slug',
        element: <Recipe />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
    ],
  },
]);
