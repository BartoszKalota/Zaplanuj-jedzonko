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
    <Row>
      <Container>
        <NavMenu />
      </Container>
    </Row>
    <Row>
      <Container>
        <Carousel />
      </Container>
    </Row>
    <Row>
      <Container>
        <CallToAction />
      </Container>
    </Row>
    <Row>
      <Container>
        <WhyUs />
      </Container>
    </Row>
    <Row>
      <Container>
        <Newsletter />
      </Container>
    </Row>
    <Row>
      <Container>
        <AboutMe />
      </Container>
    </Row>
    <Row>
      <Container>
        <Contact />
      </Container>
    </Row>
    <Row>
      <Container>
        <Footer />
      </Container>
    </Row>
  </>
);

export default LandingPage;