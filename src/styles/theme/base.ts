import { createTheme } from 'styled-breakpoints';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { breakpoints } from './system/breakpoints';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    transition-delay: 99999s;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont,  'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }

  strong,
  b,
  i,
  em,
  mark,
  small,
  del,
  ins,
  sub,
  sup {
    font: revert
  }

  a {
    text-decoration: none;

    &:focus,
    &:hover {
      text-decoration: none;
    }
  }

  .ant-layout,
  .ant-table-expanded-row {
    background-color: #f5f7fb !important;
  }
`;

export const styledComponentsScheme = { ...createTheme(breakpoints) };
