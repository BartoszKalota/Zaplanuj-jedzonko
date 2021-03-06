import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Firebase, { FirebaseContext } from './config/Firebase';

// Bez React.StrictMode, aby przy zmianie slajdu w karuzeli (LandingPage),
// nie pojawiał się błąd w konsoli (przypadłość karuzeli z Bootstrap-React).
//
// Nie chciałem używać karuzeli z innej biblioteki, bo akurat ta wymagała
// najmniej pracy przy stylowaniu w celu uzyskania pożądanego wyglądu.
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);