import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-bootstrap';

import img1 from '../../assets/carousel-bg1.jpg';
import img2 from '../../assets/carousel-bg2.jpg';
import img3 from '../../assets/carousel-bg3.jpg';

const CAROUSEL_ARROW = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Chevron_right_font_awesome.svg/768px-Chevron_right_font_awesome.svg.png';

const useStyles = makeStyles(theme => ({
  carouselSection: {
    marginTop: 75,
    '@media (min-width:1252px)': {
      marginTop: 90
    },
    // Stylowanie elementów wewnętrznych niewidocznych z poziomu kodu JS
    '& .carousel-indicators li': {
      width: 20,
      height: 20,
      borderRadius: '50%',
      marginLeft: 10,
      marginRight: 10,
      '&.active': {
        backgroundColor: theme.palette.carouselActiveDotBgrColor
      }
    },
    '& .carousel-control-next-icon, & .carousel-control-prev-icon': {
      backgroundImage: `url(${CAROUSEL_ARROW})`,
      width: 40,
      height: 40
    },
    '& .carousel-control-prev-icon': {
      transform: 'rotate(180deg)'
    },
    '& .carousel-control-next:active .carousel-control-next-icon': {
      position: 'relative',
      top: 3
    },
    '& .carousel-control-prev:active .carousel-control-prev-icon': {
      position: 'relative',
      top: 3
    }
    //
  },
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
}));

const CarouselSection = () => {
  const classes = useStyles();
  return (
    <Carousel className={classes.carouselSection} id="section1">
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