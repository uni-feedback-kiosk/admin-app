import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default () => {
  const { token } = useContext(AuthContext);

  if (token === null) {
    return <Navigate to="/login" />;
  }

  return <div>TODO</div>;
};
