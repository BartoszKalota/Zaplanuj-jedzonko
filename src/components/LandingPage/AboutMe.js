import React from 'react';
import {Container, Row} from 'react-bootstrap';

import imgSrc from '../../assets/about-me.jpg';

const AboutMe = () => (
  <Row className='about-me-row'>
    <Container className='about-me-container' id='section-2'>
      <img src={imgSrc} alt='About Me' />
      <div>
        <h5>Lorem ipsum dolor sit amet</h5>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam voluptatum ea, temporibus, accusantium vel enim aliquam voluptatem magnam, voluptatibus tempora dignissimos culpa quia nisi ad adipisci dolorum cum sunt harum doloribus aspernatur a saepe velit error corporis? Fuga, vitae nemo eos nostrum mollitia id ullam magnam animi cum ad ipsa.</p>
      </div>
    </Container>
  </Row>
);

export default AboutMe;