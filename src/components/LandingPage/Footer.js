import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

const Footer = () => (
  <Row className='footer-row'>
    <Container className='footer-container'>
      <small>
        Copyright
        <Link to='/'> ZaplanujJedzonko.pl</Link>
      </small>
    </Container>
  </Row>
);

export default Footer;