import { Card, CardBody, CardHeader, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import SystemFiles from './components/SystemFIles';

const Files = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.access_token !== undefined);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <SystemFiles />;
};

export default Files;
