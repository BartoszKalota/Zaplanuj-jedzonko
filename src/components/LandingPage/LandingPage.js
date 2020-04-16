import React from 'react';

import NavMenu from './NavMenu';
import Carousel from './Carousel';
import CallToAction from './CallToAction';
import WhyUs from './WhyUs';
import Newsletter from './Newsletter';
import AboutMe from './AboutMe';
import Contact from './Contact';
import Footer from './Footer';

const NEWSLETTERS_URL = 'http://localhost:3005/emailsForNewsletter';

const LandingPage = () => {
  // Zapisanie w bazie odbiorców newslettera adresu email użytkownika
  const handleOnAddToNewsletter = (email) => {
    fetch(NEWSLETTERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
  };

  return (
    <>
      <NavMenu />
      <Carousel />
      <CallToAction />
      <WhyUs />
      <Newsletter onAddToNewsletter={handleOnAddToNewsletter} />
      <AboutMe />
      <Contact />
      <Footer />
    </>
  );
}

export default LandingPage;