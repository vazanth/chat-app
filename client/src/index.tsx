import React from 'react';
import ReactDOM from 'react-dom';

//@chakra-ui
import { ThemeProvider, theme, ColorModeProvider, CSSReset } from '@chakra-ui/core';

//components
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
