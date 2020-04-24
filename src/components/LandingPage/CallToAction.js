import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  ctaSection: {
    backgroundColor: '#4a4a49',
    color: '#FFFFFA',
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
  header: {
    fontSize: '2.8rem',
    marginBottom: 25
  },
  descr: {
    fontSize: '1.3rem'
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
    color: '#FFFFFA',
    padding: '10px 50px',
    fontSize: '1.3rem',
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
          <Typography variant="h2" className={classes.header}>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="body1" className={classes.descr}>
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item container xs={12} md={4} className={classes.btnSection}>
          <Button variant="contained" color="secondary" className={classes.btn}>
            Lorem ipsum
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} xl={2} />
    </Grid>
  );
};
 
export default CallToAction;