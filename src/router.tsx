import { createBrowserRouter, Navigate } from 'react-router-dom';
import Files from './pages/files/Files';
import Login from './pages/login/Login';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: 'files',
        element: <Files />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <Navigate to="/files" />,
      },
    ],
  },
]);

export default router;
