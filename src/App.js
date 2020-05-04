import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import injectSheet from 'react-jss';    // w celu nadania styli globalnych
import firebase, { FirebaseProvider, withFirebaseHOC } from './config/Firebase';

import { ThemeProvider } from '@material-ui/core/styles';
import theme, { globalStyle } from './config/theme';

import * as ROUTES from './config/ROUTES';
import LandingPage from './components/LandingPage';
import AuthContainer from './components/AppMain/auth/AuthContainer';
import AppContainer from './components/AppMain/AppContainer';
import NotFound from './components/NotFound';
import NotAuthenticated from './components/AppMain/auth/NotAuthenticated';

// Autoryzacja wejścia do aplikacji
const withAuthenticate = Component => {
  const innerHOC = ({ firebase, ...props }) => {
    return firebase.auth().currentUser ? <Component {...props} /> : <NotAuthenticated />;
  };
  return withFirebaseHOC(innerHOC);
};

const App = () => (
  <ThemeProvider theme={theme}>
    <FirebaseProvider value={firebase}>
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDINGPAGE} component={LandingPage} />
          <Route path={ROUTES.LOGIN} component={AuthContainer} />
          <Route path={ROUTES.DESKTOP} component={withAuthenticate(AppContainer)} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </FirebaseProvider>
  </ThemeProvider>
);

export default injectSheet(globalStyle)(App);