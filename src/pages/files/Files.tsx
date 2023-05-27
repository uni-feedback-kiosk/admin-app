import { Box, HStack } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import SystemFiles from './components/SystemFiles';
import LanguageFiles from './components/LanguageFiles';

const Files = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.access_token !== undefined);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <HStack
      margin="auto"
      maxWidth="8xl"
      spacing="6"
      height="100%"
      paddingBottom="2"
      align="stretch"
    >
      <Box flex="1" width="0">
        <SystemFiles />
      </Box>
      <Box flex="2" width="0">
        <LanguageFiles />
      </Box>
    </HStack>
  );
};

export default Files;
