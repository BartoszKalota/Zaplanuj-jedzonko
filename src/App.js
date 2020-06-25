import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import injectSheet from 'react-jss';    // w celu nadania styli globalnych
import { withAuthentication, withAuthorization } from './config/Session';

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

const App = () => (
  <ThemeProvider theme={theme}>
    <IsLoadingProvider>
      <MsgGreenContextProvider>
        <DesktopSwitcher>
          <Router>
            <Switch>
              <Route exact path={ROUTES.LANDINGPAGE} component={LandingPage} />
              <Route path={ROUTES.LOGIN} component={AuthContainer} />
              <Route path={ROUTES.DESKTOP} component={withAuthorization(AppContainer)} />
              <Route path={ROUTES.ERROR} component={NotFound} />
              <Redirect from="*" to={ROUTES.ERROR} />
            </Switch>
          </Router>
        </DesktopSwitcher>
      </MsgGreenContextProvider>
    </IsLoadingProvider>
  </ThemeProvider>
);

export default withAuthentication(injectSheet(globalStyle)(App));