import React from 'react';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import Carousel from './Carousel';


const LandingPage = () => {
  return (
    <Grid container direction="column">
      <NavBar />
      <Carousel />
    </Grid>
  );
};
 
export default LandingPage;