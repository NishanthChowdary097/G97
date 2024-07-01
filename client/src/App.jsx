import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Homelayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Addsub,
  Stats,
  Allsubs,
  Profile,
  Admin,
  Db,
} from './pages';
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();
const router = createBrowserRouter([
  //{
  //path: '*',
  //element: <Error />,
  //},
  {
    path: '/',
    element: <Homelayout />, //component should be capitalize always
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Db />,
          },
          // {
          //   path: 'addsub',
          //   element: <Addsub />,
          // },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-subs',
            element: <Allsubs />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);
export const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
