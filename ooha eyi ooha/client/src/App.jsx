import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  HomeLayout,
  Home,
  Error,
} from './pages'

// import {loader as ingLoader} from './components/Maincontent';

const router = createBrowserRouter([
  {
    path: '/',  
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        // action: homeAction,
        // loader: ingLoader
      }
      // {
      //   path: 'units/:subjectId',
      //   element: <Units />
      // },
      // {
      //   path: 'topics/:unitId',
      //   element: <Topics />
      // }, 
      // {
      //   path: 'solve/:topicId',
      //   element: <Solve />
      // }
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