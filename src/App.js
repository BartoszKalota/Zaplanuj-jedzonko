import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import AppMain from './components/AppMain';
import NotFound from './components/NotFound';

const App = () => (
  <div className='App'>
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/app' component={AppMain} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </div>
);

export default App;