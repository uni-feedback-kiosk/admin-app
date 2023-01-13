import { useMemo } from 'react';
import { useAppSelector } from '../../store/store';

const useIsAuthenticated = () => {
  const { token } = useAppSelector((state) => state.auth);

  return useMemo(() => (token !== ''), [token]);
};

export default useIsAuthenticated;
