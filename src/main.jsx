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
import Home from './Component/Home.jsx';
import CreateProduct from './Component/CreateProduct.jsx';
import Products from './Component/Products.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><App></App></PrivateRoute>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/create",
        element:<CreateProduct></CreateProduct>
      },
      {
        path:"/products",
        element:<Products></Products>
      },

     
    ]
  },
  {path : '/register', element:<Register></Register>},
  {path : '/login', element:<Login></Login>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router} />
    <Toaster></Toaster>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
