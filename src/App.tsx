import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import router from './routes';
import { queryClient } from './services';
import { GlobalContextProvider } from './shared/context';
import { GlobalStyle, styledComponentsScheme } from './styles/theme';

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ToastContainer />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={styledComponentsScheme}>
          <GlobalStyle />
          <GlobalContextProvider>
            <RouterProvider router={router} />
          </GlobalContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
