import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from './routes';
import { GlobalStyles, theme } from './styles';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes />
        <Toaster
          toastOptions={{
            className: '',
            style: {
              color: theme.text,
              backgroundColor: theme.accent,
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
