import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { setToken } from './authSlice';
import { useAppDispatch, useAppSelector } from './storeHooks';
import Layout from '../components/layout/Layout';
import Files from '../pages/files/Files';
import Login from '../pages/Login';

export default () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const [savedToken, saveToken] = useLocalStorage<string>('token', '');

  useEffect(() => {
    if (token === savedToken) {
      return;
    }

    dispatch(setToken(savedToken));
  }, []);

  useEffect(() => {
    saveToken(token);
  }, [token]);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/files" element={<Files />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};
