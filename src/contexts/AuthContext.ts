import { createContext } from 'react';

interface AuthContextValue {
  token: string | null;
  setToken: (token: string | null) => void;
}

export default createContext<AuthContextValue>({
  token: '',
  setToken: (_) => {},
});
