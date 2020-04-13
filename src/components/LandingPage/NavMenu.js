import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

const NavMenu = () => (
  <>
    <Row className='nav-menu-row'>
      <Container className='nav-menu-container'>
        <Col sm={5}>
          <Link exact to='/'>
            <p>Zaplanuj <span>Jedzonko</span></p>
          </Link>
        </Col>
        <Col sm={7}>
          <ul id='menu'>
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
        </Col>
      </Container>
    </Row>
  </>
);

export default NavMenu;