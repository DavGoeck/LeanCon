import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "*",
    element: <NotFound />
  }
])

function App() {
  return <RouterProvider router={router}/>
}

function HomePage() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    fetch('/api').then(res => res.text()).then(setGreeting);
  }, []);

  return (
    <>
      <h1>{greeting}</h1>
    </>
  )
}

function NotFound() {
  return <div>404 Not Found</div>;
}

export default App
