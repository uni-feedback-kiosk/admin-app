import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';
import { store } from './store/store';
import theme from './theme';

const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);

export default App;
