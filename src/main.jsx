import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import LoginPage from './Pages/LoginPage.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
