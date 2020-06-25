import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as LinkScroll } from 'react-scroll';
import {
  Grid,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footerContainer: {
    backgroundColor: theme.palette.footerBgrColor
  },
  footerText: {
    color: theme.palette.white,
    padding: theme.spacing(2.5, 0)
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.footerContainer}>
      <Grid item xs={false} sm={1} xl={2} />
      <Grid item container xs={12} sm={10} xl={8} justify="center">
        <Typography component="small" className={classes.footerText}>
          Copyright
          <Typography component="span" color="secondary">
            <LinkScroll
              to="section1"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              style={{ marginLeft: 5, cursor: 'pointer' }}
            >
              ZaplanujJedzonko.pl
            </LinkScroll>
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={false} sm={1} xl={2} />
    </Grid>
  );
};
 
export default Footer;