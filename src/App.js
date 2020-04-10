import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';

const App = () => (
  <div className='App'>
    <Router>
      <>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </>
    </Router>
  </div>
);

export default App;