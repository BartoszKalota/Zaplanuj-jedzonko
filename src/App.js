import React from 'react'
import AppContainer from './navigation'
import Firebase, { FirebaseProvider } from './config/Firebase'

const App = () => (
  <FirebaseProvider value={Firebase}>
    <AppContainer />
  </FirebaseProvider>
);

export default App;