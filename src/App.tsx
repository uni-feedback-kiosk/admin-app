import { useMemo } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Layout from './components/layout/Layout';
import AuthContext from './contexts/AuthContext';
import Files from './pages/Files';
import Login from './pages/Login';

export default () => {
  const [token, setToken] = useLocalStorage<string | null>('token', null);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <HashRouter>
      <AuthContext.Provider value={contextValue}>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/files" element={<Files />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </HashRouter>
  );
};
