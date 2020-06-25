import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core';

import imgAbout from '../../assets/about-me.jpg';

const useStyles = makeStyles(theme => ({
  aboutSection: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '50px 0'
  },
  textContainer: {
    textAlign: 'center',
    paddingLeft: 0,
    marginBottom: 30,
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      paddingLeft: 100,
      marginBottom: 0
    }
  }
}));

const AboutMe = () => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.aboutSection} id="section3">
      <Grid item xs={false} sm={1} xl={2} />
      <Grid item container xs={12} sm={10} xl={8} wrap="wrap-reverse">
        <Grid item xs={12} md={5}>
          <img src={imgAbout} alt="About Me" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={7} className={classes.textContainer}>
          <Typography variant="h4" component="h5" style={{ marginBottom: 20 }}>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="h6" component="p" style={{ lineHeight: '1.8rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sed.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} xl={2} />
    </Grid>
  );
}
 
export default AboutMe;