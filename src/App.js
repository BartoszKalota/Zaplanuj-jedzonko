import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import injectSheet from 'react-jss';    // w celu nadania styli globalnych
import firebase, { FirebaseProvider, withFirebaseHOC } from './config/Firebase';

import DesktopSwitcher from './config/contexts/DesktopSwitcher';
import { ThemeProvider } from '@material-ui/core/styles';
import theme, { globalStyle } from './config/theme';

import IsLoadingProvider from './config/contexts/IsLoadingContext';
import MsgGreenContextProvider from './config/contexts/MsgGreenContext';

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
      <IsLoadingProvider>
        <MsgGreenContextProvider>
          <DesktopSwitcher>
            <Router>
              <Switch>
                <Route exact path={ROUTES.LANDINGPAGE} component={LandingPage} />
                <Route path={ROUTES.LOGIN} component={AuthContainer} />
                <Route path={ROUTES.DESKTOP} component={withAuthenticate(AppContainer)} />
                <Route path={ROUTES.ERROR} component={NotFound} />
                <Redirect from="*" to={ROUTES.ERROR} />
              </Switch>
            </Router>
          </DesktopSwitcher>
        </MsgGreenContextProvider>
      </IsLoadingProvider>
    </FirebaseProvider>
  </ThemeProvider>
);

export default injectSheet(globalStyle)(App);