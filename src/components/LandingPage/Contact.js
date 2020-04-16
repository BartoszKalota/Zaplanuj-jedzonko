import React from 'react';
import {Container, Row} from 'react-bootstrap';

const Contact = () => (
  <Row className='contact-row'>
    <Container className='contact-container' id='section-3'>
      <div className='column column-reversed-color'>
        <h6>Lorem ipsum dolor</h6>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna.</p>
      </div>
      <div className='column column-reversed-color'>
        <h6>Lorem ipsum dolor</h6>
        <ul>
          <li>consectetur adipiscing elit</li>
          <li>sed do eiusmod tempor</li>
          <li>incididunt ut labore</li>
          <li>et dolore magna aliqua</li>
        </ul>
      </div>
      <div className='column column-reversed-color'>
        <h6>Nasz newsletter</h6>
        <form className='newsletter-form contact-section-form'>
          <input
            placeholder='Podaj adres e-mail'
            type='email'
          />
          <button
            type='submit'
          >
            Zapisuję się!
          </button>
        </form>
        <div className='socials'>
          <a href='https://www.facebook.com/'>
            <i class="fab fa-facebook-square"></i>
          </a>
          <a href='https://twitter.com/explore'>
            <i class="fab fa-twitter-square"></i>
          </a>
          <a href='https://www.instagram.com/?hl=pl'>
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </Container>
  </Row>
);

export default Contact;