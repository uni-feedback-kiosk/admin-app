import { useCallback } from 'react';
import { Box, Button, Flex, HStack, Heading, Icon, Spacer } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/store';
import { authLogout } from '../store/actions';

const Layout = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.access_token !== undefined);
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => dispatch(authLogout()), [dispatch]);

  return (
    <Flex alignItems="stretch" direction="column" height="100%">
      <HStack as="header" padding="4">
        <Heading size="md">Kiosk Administration</Heading>
        <Spacer />
        <Button
          onClick={onClick}
          colorScheme="red"
          leftIcon={<Icon as={MdLogout} />}
          visibility={isAuthenticated ? 'visible' : 'hidden'}
        >
          Log out
        </Button>
      </HStack>
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
