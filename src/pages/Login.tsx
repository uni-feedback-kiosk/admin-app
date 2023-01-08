import { createRef, FormEvent, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Error from '../components/ui/Error';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import AuthContext from '../contexts/AuthContext';
import authenticate from '../data/api/auth';
import { getErrorInfo } from '../data/api/errors';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: stretch;
  min-width: 30vw;
  font-size: 1.5em;
`;

const Login = () => {
  const { token, setToken } = useContext(AuthContext);

  const [error, setError] = useState('');

  const usernameField = createRef<HTMLInputElement>();
  const passwordField = createRef<HTMLInputElement>();

  const logIn = async (username: string, password: string) => {
    setError('');

    authenticate(username, password).then(
      ({ data }) => {
        setToken(data.access_token);
      },
      (err) => setError(getErrorInfo(err).message),
    );
  };

  const submitAction = async (e: FormEvent) => {
    e.preventDefault();

    if (usernameField.current === null || passwordField.current === null) {
      return;
    }

    logIn(usernameField.current.value, passwordField.current.value);
  };

  return token ? (
    <Navigate to="/files" />
  ) : (
    <>
      <StyledForm onSubmit={submitAction}>
        <Input
          minLength={3}
          placeholder="Login"
          type="text"
          name="username"
          ref={usernameField}
          required
        />
        <Input
          minLength={8}
          placeholder="Password"
          type="password"
          name="password"
          ref={passwordField}
          required
        />
        <Button style={{ alignSelf: 'center' }} type="submit">
          Log In
        </Button>
      </StyledForm>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Login;
