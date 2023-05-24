import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';
import './index.css';
import theme from './theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <StrictMode>
      <App />
    </StrictMode>
  </>,
);
