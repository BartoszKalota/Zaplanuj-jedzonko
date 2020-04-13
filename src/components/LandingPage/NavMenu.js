import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

const LANDING_PAGE_MENU_URL = 'http://localhost:3005/landingpageMenu';
const MOBILEMAX = 992 + 15; // +15px szerokości za pasek przewijania

const NavMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileMode, setMobileMode] = useState(false);

  // Pobranie elementów menu
  useEffect(() => {
    fetch(LANDING_PAGE_MENU_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Błąd');
      })
      .then(menuItems => {
        setMenuItems(menuItems);
        // Nasłuchiwanie na przejście granicy trybu mobilnego
        window.addEventListener('resize', () => checkWindowWidth());
      });
  }, []);
  
  // Zmiana trybu (state'u) w zależności od szerokości okna
  const checkWindowWidth = () => setMobileMode(window.innerWidth < MOBILEMAX);

  // Warunkowe renderowanie wyglądu menu
  let navMenu = (                            // zwykłe menu
    <ul className='nav-menu'>
      {menuItems.map(({id, name, link}) => (
        <li key={id}>
          <Link to={link}>{name}</Link>
        </li>
      ))}
    </ul>
  );
  if (mobileMode) {
    navMenu = (                              // hamburger
      <p>hamburger</p>
    );
  }

  return (
    <>
      <Row className='nav-menu-row'>
        <Container className='nav-menu-container'>
          <Link exact to='/' className='nav-menu-logo'>
            <p>Zaplanuj <span>Jedzonko</span></p>
          </Link>
          {navMenu}
        </Container>
      </Row>
    </>
  );
}

export default NavMenu;