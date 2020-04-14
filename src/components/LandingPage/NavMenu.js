import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

const LANDING_PAGE_MENU_URL = 'http://localhost:3005/landingpageMenu';
const MOBILEMAX = 992 + 15; // +15px szerokości (pasek przewijania)

const NavMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileMode, setMobileMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        checkWindowWidth(); // po otwarciu strony
        window.addEventListener('resize', () => checkWindowWidth()); // po zmianie szerokości okna
      });
  }, []);
  
  // Zmiana trybu (mobilny lub nie) w zależności od szerokości okna
  const checkWindowWidth = () => setMobileMode(window.innerWidth < MOBILEMAX);

  // Otwarcie/Zamknięcie mobilnego menu (hamburgera)
  const handleOnHamburger = () => setIsMenuOpen(prevState => !prevState);

  // Menu
  const navMenu = (                     // w trybie mobilnym lub standardowym
    <ul className={mobileMode ? 'nav-menu mobile-menu' : 'nav-menu'}>
      {menuItems.map(({id, name, link}) => (
        <li key={id}>
          <Link to={link}>{name}</Link>
        </li>
      ))}
    </ul>
  );

  // Hamburger
  const hamburger = (
    <button className='hamburger' onClick={handleOnHamburger}>
      {isMenuOpen
        ? <i className="fas fa-times"></i>  // otwarty lub zamknięty
        : <i className="fas fa-bars"></i>}
    </button>
  );

  // Menu jest domyślnie ukrywane w trybie mobilnym, 
  // a widoczne w trybie standardowym
  useEffect(() => {
    const isMenuOpen = mobileMode ? false : true;
    setIsMenuOpen(isMenuOpen);
  }, [mobileMode]);

  return (
    <>
      <Row className='nav-menu-row'>
        <Container className='nav-menu-container'>
          <Link exact to='/' className='nav-menu-logo'>
            <p>Zaplanuj <span>Jedzonko</span></p>
          </Link>
          {isMenuOpen && navMenu}
          {mobileMode && hamburger}
        </Container>
      </Row>
    </>
  );
};

export default NavMenu;