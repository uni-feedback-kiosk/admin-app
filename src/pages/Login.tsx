import { createRef, FormEvent } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import Error from '../components/ui/Error';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import authenticate from '../data/api/auth';
import handleError from '../data/api/errors';
import { useAppDispatch, useAppSelector } from '../app/storeHooks';
import { clearToken, setToken } from '../app/authSlice';
import { clearError, setError } from '../app/errorSlice';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: stretch;
  min-width: 30vw;
  font-size: 1.5em;
`;

const Login = () => {
  const token = useAppSelector((state) => state.auth.token);
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  const usernameField = createRef<HTMLInputElement>();
  const passwordField = createRef<HTMLInputElement>();

  const logIn = async (username: string, password: string) => {
    dispatch(clearError());

    authenticate(username, password).then(
      ({ data }) => {
        dispatch(setToken(data.access_token));
      },
      (err) => handleError(
        err,
        (message) => dispatch(setError(message)),
        () => dispatch(clearToken()),
      ),
    );
  };

  const submitAction = async (e: FormEvent) => {
    e.preventDefault();

    if (usernameField.current === null || passwordField.current === null) {
      return;
    }

    logIn(usernameField.current.value, passwordField.current.value);
  };

  if (token !== '') {
    return <Navigate to="/files" />;
  }

  return (
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
