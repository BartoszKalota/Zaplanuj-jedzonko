import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBar = () => (
  <>
    <Link exact to='/app'>
      <p>Zaplanuj <span>Jedzonko</span></p>
    </Link>
    <div className='user-section'>
      Imię
      <i className="fas fa-user-circle"></i>
    </div>
  </>
);

export default HeaderBar;