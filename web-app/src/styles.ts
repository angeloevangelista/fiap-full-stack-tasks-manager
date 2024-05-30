import { createGlobalStyle } from 'styled-components';

const theme = {
  text: '#ffffff',
  background: '#121215',
  primary: '#ed145b',
  secondary: '#18181c',
  accent: '#2f2d36',
};

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Inter, sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${theme.background};
  }

  body,
  input,
  button,
  textarea {
    color: ${theme.text};
  }

  button {
    cursor: pointer;
  }
`;

export { GlobalStyles, theme };
