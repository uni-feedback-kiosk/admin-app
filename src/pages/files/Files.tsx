import { Card, CardBody, Flex, VStack } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

const Files = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.access_token !== undefined);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Flex alignItems="center" direction="column" height="100%">
      <VStack flex="1" justifyContent="center" gap="10">
        <Card borderRadius="xl">
          <CardBody>Files will be here soon</CardBody>
        </Card>
      </VStack>
    </Flex>
  );
};

export default Files;
