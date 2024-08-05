import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  HomeLayout,
  Home,
  Error,
  Login,
  Register,
  Landing
} from './pages'


const router = createBrowserRouter([
  {
    path: '/',  
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path:'home',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        index: true,
        element: <Landing />
      }
    ]
  }
])


function App() {
return (
  <>
    <RouterProvider router={router} />
  </>
)
}

export default App