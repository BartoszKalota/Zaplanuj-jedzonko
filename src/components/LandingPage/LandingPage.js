import React from 'react';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import CarouselSection from './Carousel';
import CallToAction from './CallToAction';
import WhyUs from './WhyUs';

const LandingPage = () => {
  return (
    <Grid container direction="column">
      <NavBar />
      <CarouselSection />
      <CallToAction />
      <WhyUs />
    </Grid>
  );
};
 
export default LandingPage;