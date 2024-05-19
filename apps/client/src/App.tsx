import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppContext from './context/AppContext';
import Page from './pages/common/Page';
import ErrorPage from './pages/ErrorPage';
import Timeline from './pages/Timeline';
import Services from './pages/Services';
import Contractors from './components/contractors/Contractors';
import Dashboard from './pages/Dashboard';
import ProjectCreator from './components/projects/ProjectCreator';
import ContractorCreator from './components/contractors/ContractorCreator';
import Login from './components/users/Login.tsx';
import Content from './pages/common/Content.tsx';
import Logout from './components/users/Logout.tsx';
import Registration from './components/users/Registration.tsx';
import UserForm from './components/users/UserForm.tsx';
import Project from './components/projects/Project.tsx';
import ProjectModifier from './components/projects/ProjectModifier';
import ProjectDetails from './components/projects/ProjectDetails';
import ContractorSelfservice from './components/contractors/ContractorSelfservice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Content />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: 'p/neu',
            element: <ProjectCreator />
          },
          {
            path: 'p/:slug',
            element: <Project />,
            children: [
              {
                index: true,
                element: <ProjectDetails />
              },
              {
                path: 'bearbeiten',
                element: <ProjectModifier />
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
              },
              {
                path: 'gewerke/neu',
                element: <ContractorCreator />
              }
            ]
          }
        ]
      },
      {
        path: 'gewerk',
        element: <ContractorSelfservice />
      },
      {
        path: 'nutzer',
        element: <UserForm />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'logout',
            element: <Logout />
          },
          {
            path: 'registrierung',
            element: <Registration />
          }
        ]
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
