import React from 'react';
import {Container, Row} from 'react-bootstrap';

const WhyUs = () => (
  <Row className='why-us-row'>
    <Container className='why-us-container'>
      <div className='column'>
        <i className="fas fa-check"></i>
        <h3>Lorem ipsum dolor sit amet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliqaum at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.</p>
      </div>
      <div className='column'>
        <i className="far fa-clock"></i>
        <h3>Lorem ipsum dolor sit amet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliqaum at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.</p>
      </div>
      <div className='column'>
        <i className="fas fa-list"></i>
        <h3>Lorem ipsum dolor sit amet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliqaum at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.</p>
      </div>
    </Container>
  </Row>
);

export default WhyUs;