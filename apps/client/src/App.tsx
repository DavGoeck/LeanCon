import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Page from './pages/Page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage/>,
    errorElement: <ErrorPage />
  }
])

function App() {
  return <RouterProvider router={router}/>
}

function DashboardPage() {

  return (
    <Page content={<Home/>}/>
  )
}

function Home() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    fetch('/api').then(res => res.text()).then(setGreeting);
  }, []);

  return <h1>{greeting}</h1>
}

export default App
