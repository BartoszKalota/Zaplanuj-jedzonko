import React from 'react';
import {
  Link
} from 'react-router-dom';

const NavMenu = () => (
  <>
    <Link exact to='/'>
      <p>Zaplanuj <span>Jedzonko</span></p>
    </Link>
    <ul>
      <li>
        <Link to='/app'>Zaplanuj posiłki!</Link>
      </li>
      <li>
        <Link to='/#section-1'>Dlaczego warto?</Link>
      </li>
      <li>
        <Link to='/#section-2'>O mnie</Link>
      </li>
      <li>
        <Link to='/#section-3'>Kontakt</Link>
      </li>
    </ul>
  </>
);

export default NavMenu;