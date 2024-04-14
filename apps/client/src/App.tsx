import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Page from './pages/common/Page';
import Projects from './components/projects/Projects';
import Timeline from './pages/Timeline';
import Services from './pages/Services';
import Contractors from './pages/Contractors';
import Dashboard from './pages/Dashboard';
import ProjectCreator from './components/projects/ProjectCreator';
import AppContext from './context/AppContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,
        element: <Dashboard />
      },
      {
        path: 'projekte',
        element: <Projects />
      },
      {
        path: 'projekte/neu',
        element: <ProjectCreator />
      },
      {
        path: 'zeitplan',
        element: <Timeline />
      },
      {
        path: 'leistungsverzeichnis',
        element: <Services />
      },
      {
        path: 'gewerke',
        element: <Contractors />
      }
    ]
  }
])

const App = () => {
  return <>
    <AppContext>
      <RouterProvider router={router}/>
    </AppContext>
  </>
}

export default App
