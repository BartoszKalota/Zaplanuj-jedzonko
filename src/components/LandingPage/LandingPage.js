import React from 'react';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import CarouselSection from './Carousel';
import CallToAction from './CallToAction';
import WhyUs from './WhyUs';
import Newsletter from './Newsletter';
import AboutMe from './AboutMe';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <Grid container direction="column">
      <NavBar />
      <CarouselSection />
      <CallToAction />
      <WhyUs />
      <Newsletter />
      <AboutMe />
      <Contact />
      <Footer />
    </Grid>
  );
};
 
export default LandingPage;