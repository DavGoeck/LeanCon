import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProjectsPage from './pages/ProjectPage';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import ServicesPage from './pages/ServicesPage';
import ContractorsPage from './pages/ContractorsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <ErrorPage />
  },
  {
    path: 'projekte',
    element: <ProjectsPage />
  },
  {
    path: 'zeitplan',
    element: <TimelinePage />
  },
  {
    path: 'leistungsverzeichnis',
    element: <ServicesPage />
  },
  {
    path: 'gewerke',
    element: <ContractorsPage />
  }
])

const App = () => {
  return <RouterProvider router={router}/>
}

export default App
