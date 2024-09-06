import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import Login from './Component/Login.jsx';
import Register from './Component/Register.jsx';
import PrivateRoute from './privateRoute/privateRoute.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><App></App></PrivateRoute>,
  },
  {path : '/register', element:<Register></Register>},
  {path : '/login', element:<Login></Login>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    <Toaster></Toaster>
    </AuthProvider>
  </StrictMode>,
)
