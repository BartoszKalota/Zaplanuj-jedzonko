import React, {useState, useEffect} from 'react';
import {
  NavLink
} from 'react-router-dom';

const MENU_URL = 'http://localhost:3005/menu';

const Navigation = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(MENU_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Błąd');
      })
      .then(menuItems => setMenuItems(menuItems));
  }, []);

  return (
    <>
      {menuItems.map(({id, name, link}) => (
        <li key={id}>
          <NavLink
            to={link}
            className='nav-item'
            activeClassName='nav-item-active'
          >
            {name}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export default Navigation;