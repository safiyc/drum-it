import { createGlobalStyle } from 'styled-components';

// globalstyle - html/body, css variables for colors, etc.
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    /* background-color: white; */
  }
`;

export default GlobalStyle;