import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import LoginPage from './Pages/LoginPage.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import CheckEmail from './Pages/CheckEmail.jsx';
import AuthCallback from './Pages/AuthCallback.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/signup' replace />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/signup',
    element: <SignUpPage/>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/check-email',
    element: <CheckEmail />
  },
  {
    path: '/dashboard',
    element: <App />
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
