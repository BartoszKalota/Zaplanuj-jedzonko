import React from 'react';
import AppContainer from './components/AppMain/Signup';
import Firebase, { FirebaseProvider } from './config/Firebase';

const App = () => (
  <FirebaseProvider value={Firebase}>
    <AppContainer />
  </FirebaseProvider>
);

export default App;