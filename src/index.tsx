import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial;     
}
`
const theme = {
  colors: {
    primary: 'blue',
    secondary: 'green',
  },
  width: {
    primary: 200,
  },
  daySize: {
    primary: 30,
  },
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Global />
    <App />
  </ThemeProvider>
);

