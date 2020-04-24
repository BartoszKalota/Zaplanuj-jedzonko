import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-bootstrap';

import img1 from '../../assets/carousel-bg1.jpg';
import img2 from '../../assets/carousel-bg2.jpg';
import img3 from '../../assets/carousel-bg3.jpg';
 

const useStyles = makeStyles({
  carouselItem: {
    height: 500,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.5
  },
  caption: {
    height: '90%',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  captionHeader: {
    fontSize: '4rem'
  },
  captionDescr: {
    fontSize: '1.3rem'
  }
  // Reszta styli w odpowiednim pliku SCSS (dla elementów HTML, które nie są widoczne z poziomu kodu JS)
});

const CarouselSection = () => {
  const classes = useStyles();
  return (
    <Carousel>
      <Carousel.Item>
        <div
          className={`${classes.carouselItem} d-block w-100`}
          style={{ backgroundImage: `url(${img1})` }}
        />
        <Carousel.Caption className={classes.caption}>
          <h3 className={classes.captionHeader}>First slide label</h3>
          <p className={classes.captionDescr}>Nulla vitae elit libero, a pharetra augue mollis interdum</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className={`${classes.carouselItem} d-block w-100`}
          style={{ backgroundImage: `url(${img2})` }}
        />

        <Carousel.Caption className={classes.caption}>
          <h3 className={classes.captionHeader}>Second slide label</h3>
          <p className={classes.captionDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className={`${classes.carouselItem} d-block w-100`}
          style={{ backgroundImage: `url(${img3})` }}
        />
        <Carousel.Caption className={classes.caption}>
          <h3 className={classes.captionHeader}>Third slide label</h3>
          <p className={classes.captionDescr}>Praesent commodo cursus magna, vel scelerisque nisl consectetur</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
 
export default CarouselSection;