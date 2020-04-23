import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import AppContainer from './components/AppMain/Signup';
import NotFound from './components/NotFound';

const App = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/app" component={AppContainer} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </>
);

export default App;