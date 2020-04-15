import React from 'react';
import {Container, Row} from 'react-bootstrap';

const Newsletter = () => (
  <Row className='newsletter-row'>
    <Container className='newsletter-container'>
      <h4>Zapisz się do naszego newslettera</h4>
      <form className='newsletter-form'>
        <input
          placeholder='Podaj adres e-mail'
          type='email'
        />
        <button type='submit'>Zapisuję się!</button>
      </form>
    </Container>
  </Row>
);

export default Newsletter;