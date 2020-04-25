import React from 'react';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import CarouselSection from './Carousel';
import CallToAction from './CallToAction';
import WhyUs from './WhyUs';
import Newsletter from './Newsletter';
import AboutMe from './AboutMe';

const LandingPage = () => {
  return (
    <Grid container direction="column">
      <NavBar />
      <CarouselSection />
      <CallToAction />
      <WhyUs />
      <Newsletter />
      <AboutMe />
    </Grid>
  );
};
 
export default LandingPage;