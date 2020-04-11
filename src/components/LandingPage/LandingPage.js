import React from 'react';

import NavMenu from './NavMenu';
import Carousel from './Carousel';
import CallToAction from './CallToAction';
import WhyUs from './WhyUs';
import Newsletter from './Newsletter';
import AboutMe from './AboutMe';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => (
  <div>
    <NavMenu />
    <Carousel />
    <CallToAction />
    <WhyUs />
    <Newsletter />
    <AboutMe />
    <Contact />
    <Footer />
  </div>
);

export default LandingPage;