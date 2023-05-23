import { Button, Card, CardBody, Center, Input, VStack } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { Form, Navigate } from 'react-router-dom';
import { useAuthenticateMutation } from '../../store/apiSlice';
import FormError from '../../components/FormError';
import { useAppSelector } from '../../store/store';

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [authenticate, { isError, error }] = useAuthenticateMutation();

  const onSubmit = useCallback(async () => {
    if (!usernameRef.current || !passwordRef.current) {
      return;
    }

    await authenticate({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  }, [authenticate]);

  const isAuthenticated = useAppSelector((state) => state.auth.access_token !== undefined);

  if (isAuthenticated) {
    return <Navigate to="/files" />;
  }

  return (
    <Center as={Form} onSubmit={onSubmit} height="100%">
      <Card bg="message-link">
        <CardBody>
          <VStack>
            <Input ref={usernameRef} placeholder="Login" isRequired />
            <Input ref={passwordRef} placeholder="Password" type="password" isRequired />
            <FormError {...{ isError, error }} />
            <Button type="submit">Log in</Button>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Login;
