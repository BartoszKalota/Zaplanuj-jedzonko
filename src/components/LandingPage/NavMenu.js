import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

const LANDING_PAGE_MENU_URL = 'http://localhost:3005/landingpageMenu';

const NavMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(LANDING_PAGE_MENU_URL)
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
      <Row className='nav-menu-row'>
        <Container className='nav-menu-container'>
          <Link exact to='/' className='nav-menu-logo'>
            <p>Zaplanuj <span>Jedzonko</span></p>
          </Link>
          <ul className='nav-menu-menu'>
            {menuItems.map(({id, name, link}) => (
              <li key={id}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </Row>
    </>
  );
}

export default NavMenu;