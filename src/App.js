import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';

import LandingPage from './components/LandingPage';
import AppContainer from './components/AppMain/AppContainer';
import NotFound from './components/NotFound';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/app" component={AppContainer} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;