import React from 'react';
import ReactDOM from 'react-dom';

import './scss/main.scss';  // głównie do przerobienia wybranych styli z zewnętrznych bibliotek
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);