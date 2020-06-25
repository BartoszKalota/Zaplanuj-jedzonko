export const globalStyle = {
  '@global': {
    a: {
      color: 'inherit', // !important zaburzało działanie activeClassName w navbarze aplikacji
      textDecoration: [['none'], '!important']
    }
  }
};