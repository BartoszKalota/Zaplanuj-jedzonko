import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    accountMenuBorderColor: '#d3d4d5',
    arrowBackLinkBgrColor: '#8080802b',
    arrowBackLinkHoverBgrColor: 'rgb(0, 0, 0, 0.15)',
    carouselActiveDotBgrColor: '#0000057d',
    fontFamilyAlt: '"Charmonman", cursive',
    footerBgrColor: '#383838',
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
    },
    tableHeaderBorder: 'rgba(0, 0, 0, 0.12)',
    tableRowDark: 'rgba(0, 0, 0, 0.04)',
    tableRowHover: 'rgba(0, 0, 0, 0.08)',
    tileButtonBgrColor: '#a1a19433',
    white: '#FFF'
  },
  typography: {
    fontFamily: 'Open Sans'
  }
});

export default theme;

export const globalStyle = {
  '@global': {
    a: {
      color: 'inherit', // !important zaburzało działanie activeClassName w navbarze aplikacji
      textDecoration: [['none'], '!important']
    }
  }
};