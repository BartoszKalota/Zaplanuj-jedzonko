import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';

import * as ROUTES from './config/ROUTES';
import LandingPage from './components/LandingPage';
import AuthContainer from './components/AppMain/auth/AuthContainer';
import NotFound from './components/NotFound';
import AppContainer from './components/AppMain/AppContainer';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path={ROUTES.LANDINGPAGE} component={LandingPage} />
        <Route path={ROUTES.LOGIN} component={AuthContainer} />
        <Route path={ROUTES.DESKTOP} component={AppContainer} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;