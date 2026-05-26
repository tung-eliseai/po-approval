import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { EliseTheme } from '@elise/design-system';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={EliseTheme}>
    <App />
  </MantineProvider>
);
