import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Page from './pages/common/Page';
import Projects from './components/projects/Projects';
import Timeline from './pages/Timeline';
import Services from './pages/Services';
import Contractors from './components/contractors/Contractors';
import Dashboard from './pages/Dashboard';
import ProjectCreator from './components/projects/ProjectCreator';
import AppContext from './context/AppContext';
import ContractorCreator from './components/contractors/ContractorCreator';
import Login from './components/users/Login.tsx';
import Content from './pages/common/Content.tsx';
import Logout from './components/users/Logout.tsx';
import Registration from './components/users/Registration.tsx';
import UserForm from './components/users/UserForm.tsx';

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
          },
          {
            path: 'gewerke/neu',
            element: <ContractorCreator />
          }
        ]
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
