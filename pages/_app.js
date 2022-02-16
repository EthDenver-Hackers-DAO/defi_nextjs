import '../styles/globals.scss';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Zoom } from '@mui/material';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(',')
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          TransitionComponent={Zoom}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
