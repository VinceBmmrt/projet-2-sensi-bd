import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AddPostPage from './components/AddPostPage/AddPostPage';
import SignupForm from './components/SignupForm/SignupForm';
import UserProfilePage from './components/ProfilPage/ProfilPage';
import CreditPage from './components/CreditPage/CreditPage';
import ConversationPage from './components/ConversationPage/ConversationPage';
import DiscussionsPage from './components/DiscussionsPage/DiscussionsPage';
// eslint-disable-next-line import/prefer-default-export
export const router = createBrowserRouter([
  {
    // path correspond à l'url
    path: '/',
    // l'élément JSX à afficher sur cette page
    element: <App />,
    // En cas d'erreur, on pourra spécifier un composant à afficher
    errorElement: <Error />,

    // En fonction de certaines url, on peut afficher certains composants enfants qui prendront la place de l'élément outlet
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
        path: '/addPost',
        element: <AddPostPage />,
      },
      {
        path: '/profil',
        element: <UserProfilePage />,
      },

      {
        path: '/signup',
        element: <SignupForm />,
      },
      {
        path: '/credits',
        element: <CreditPage />,
      },
      {
        path: '/messages/:postId/:userId',
        element: <ConversationPage />,
      },
      {
        path: '/messages',
        element: <DiscussionsPage />,
      },
    ],
  },
]);
