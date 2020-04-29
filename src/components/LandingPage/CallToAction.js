import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  ctaSection: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    padding: '40px 0'
  },
  textSection: {
    textAlign: 'center',
    marginBottom: 30,
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginBottom: 0
    }
  },
  btnSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    }
  },
  btn: {
    color: theme.palette.background.paper,
    padding: '10px 50px',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  }
}));

const CallToAction = () => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.ctaSection}>
      <Grid item xs={false} sm={1} xl={2} />
      <Grid item container xs={12} sm={10} xl={8}>
        <Grid item xs={12} md={8} className={classes.textSection}>
          <Typography variant="h4" component="h2" gutterBottom>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="h6" component="p">
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item container xs={12} md={4} className={classes.btnSection}>
          <Link to="/app-login">
            <Button variant="contained" color="secondary" className={classes.btn}>
              Lorem ipsum
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} xl={2} />
    </Grid>
  );
};
 
export default CallToAction;