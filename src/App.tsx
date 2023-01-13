import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Files from './pages/files/Files';
import Login from './pages/login/Login';
import { setToken } from './pages/login/authSlice';
import useReduxLocalStorage from './store/hooks';
import { RootState } from './store/store';

export default () => {
  const token = useReduxLocalStorage(
    (state: RootState) => state.auth.token,
    setToken,
    'token',
    '',
  );

  const isAuthenticated = token !== '';

  return (
    <HashRouter>
      <Layout>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/files" element={<Files />} />
              <Route path="*" element={<Navigate to="/files" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Layout>
    </HashRouter>
  );
};
