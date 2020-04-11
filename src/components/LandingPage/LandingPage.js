import React from 'react';
import { Container, Row } from 'react-bootstrap';

import NavMenu from './NavMenu';
import Carousel from './Carousel';
import CallToAction from './CallToAction';
import WhyUs from './WhyUs';
import Newsletter from './Newsletter';
import AboutMe from './AboutMe';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => (
  <>
    <Row className='nav-menu-row'>
      <Container className='nav-menu-container'>
        <NavMenu />
      </Container>
    </Row>
    <Carousel />
    <Row className='call-to-action-row'>
      <Container className='call-to-action-container'>
        <CallToAction />
      </Container>
    </Row>
    <Row className='why-us-row'>
      <Container className='why-us-container'>
        <WhyUs />
      </Container>
    </Row>
    <Row className='newsletter-row'>
      <Container className='newsletter-container'>
        <Newsletter />
      </Container>
    </Row>
    <Row className='about-me-row'>
      <Container className='about-me-container' id='section-2'>
        <AboutMe />
      </Container>
    </Row>
    <Row className='contact-row'>
      <Container className='contact-container' id='section-3'>
        <Contact />
      </Container>
    </Row>
    <Row className='footer-row'>
      <Container className='footer-container'>
        <Footer />
      </Container>
    </Row>
  </>
);

export default LandingPage;