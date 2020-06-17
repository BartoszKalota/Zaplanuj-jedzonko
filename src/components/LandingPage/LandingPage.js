import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  CircularProgress,
  Grid
} from '@material-ui/core';

import NewsletterProvider from '../../config/contexts/NewsletterContext';
import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';

import NavBar from './NavBar';
import CarouselSection from './Carousel';
import CallToAction from './CallToAction';
import WhyUs from './WhyUs';
import Newsletter from './Newsletter';
import AboutMe from './AboutMe';
import Contact from './Contact';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#FFF',
  }
}));

const LandingPage = () => {
  const classes = useStyles();
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  const handleOnContentLoaded = () => setIsLoading(false);

  // Przywrócenie domyślnej wartości state'a z contextu po odmontowaniu bieżącego komponentu (ponownie uruchomi się kręciołek ładowania)
  useEffect(() => {
    document.title = 'Zaplanuj Jedzonko';
    return () => setIsLoading(true);
  }, []);

  return (
    <NewsletterProvider>
      <Grid container direction="column" onLoad={handleOnContentLoaded}>
        <NavBar />
        <CarouselSection />
        <CallToAction />
        <WhyUs />
        <Newsletter />
        <AboutMe />
        <Contact />
        <Footer />
      </Grid>

      {/* Ekran ładowania */}
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </NewsletterProvider>
  );
};
 
export default LandingPage;