import { useCallback } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { MdDarkMode, MdLogout } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/store';
import { authLogout } from '../store/actions';

const Layout = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.access_token !== undefined);
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const onClick = useCallback(() => dispatch(authLogout()), [dispatch]);

  return (
    <Flex alignItems="stretch" direction="column" height="100%">
      <HStack as="header" padding="4">
        <Heading size="md">Kiosk Administration</Heading>
        <Spacer />
        <HStack padding={4}>
          <Icon boxSize={6} as={MdDarkMode} />
          <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
        </HStack>
        <Button
          onClick={onClick}
          colorScheme="red"
          leftIcon={isAuthenticated ? <Icon boxSize={6} as={MdLogout} /> : undefined}
          isDisabled={!isAuthenticated}
        >
          {isAuthenticated ? 'Log out' : 'Not logged in'}
        </Button>
      </HStack>
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
