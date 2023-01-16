import { createRef, FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Notification from '../../components/ui/Notification';
import { getErrorMessage, useAuthenticateMutation } from '../../store/apiSlice';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: stretch;
  min-width: 30vw;
  font-size: 1.5em;

  > button {
    align-self: center;
  }
`;

const Login = () => {
  const usernameField = createRef<HTMLInputElement>();
  const passwordField = createRef<HTMLInputElement>();
  const [authenticate, {
    isError,
    error,
  }] = useAuthenticateMutation();

  const submitAction = async (e: FormEvent) => {
    e.preventDefault();

    if (usernameField.current === null || passwordField.current === null) {
      return;
    }

    await authenticate({
      username: usernameField.current.value,
      password: passwordField.current.value,
    });
  };

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
        <Button type="submit">
          Log In
        </Button>
      </StyledForm>
      {isError && <Notification type="error">{getErrorMessage(error!)}</Notification>}
    </>
  );
};

export default Login;
