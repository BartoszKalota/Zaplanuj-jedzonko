import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Navigation from './Navigation';
import Welcome from './Welcome';
import Test from './Test';

const AppMain = () => (
  <>
    <Navigation />  
    <Switch>
      <Route exact path='/app' component={Welcome} />
      <Route path='/app/test' component={Test} />
    </Switch>
  </>
);

export default AppMain;