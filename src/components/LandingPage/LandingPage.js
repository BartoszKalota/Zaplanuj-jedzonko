import React from 'react';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import CarouselSection from './Carousel';


const LandingPage = () => {
  return (
    <Grid container direction="column">
      <NavBar />
      <CarouselSection />
    </Grid>
  );
};
 
export default LandingPage;