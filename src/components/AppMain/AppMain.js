import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import HeaderBar from './HeaderBar';
import Navigation from './Navigation'
import Welcome from './Welcome';
import Test from './Test';

const AppMain = () => (
  <>
    <section className='app-scaffold'>
      <section className='app-header'>
        <HeaderBar />
      </section>
      <section className='app-main'>
        <div className='nav'>
          <Navigation />
        </div>
        <div className='presentation'>
          <Switch>
            <Route exact path='/app' component={Welcome} />
            <Route path='/app/test' component={Test} />
          </Switch>
        </div>
      </section>
    </section>
  </>
);

export default AppMain;