import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a4a49'       // nagłówek, kolor tekstu w kolumnach
    },
    secondary: {
      main: '#FF6600'       // przyciski, wyróżnienia, nagłówki ekranów
    },
    text: {
      primary: '#5B605F',   // panel boczny, nawigacja
      secondary: '#A1A194'  // kolor tekstu z wierszy w tabelach, ikony rozszerzonych funkcji
    },
    background: {
      paper: '#FFFFFA',     // kolor tła ekranów
      default: '#BD4932'    // kolor ikony kosza
    },
    warning: {
      main: '#FFB03B'
    },
    info: {
      main: '#3498DB'
    },
    success: {
      main: '#468966'
    }
  },
  typography: {
    fontFamily: 'Open Sans'
  }
});

export default theme;