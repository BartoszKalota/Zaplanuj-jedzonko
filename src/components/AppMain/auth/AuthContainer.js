import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import bgImg from '../../../assets/bg.png';

import * as ROUTES from '../../../config/ROUTES';
import LogIn from './LogIn';
import SignUp from './SignUp';
import ForgotPwd from './ForgotPwd';

const useStyles = makeStyles(theme => ({
  background: {
    width: '100vw',
    minHeight: '100vh',
    padding: theme.spacing(4, 7),
    background: `url(${bgImg}) repeat`
  },
  content: {
    padding: theme.spacing(2, 2, 5, 2),
    position: 'relative'
  },
  arrowBackLink: {
    display: 'inline-block',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#8080802b',
    borderRadius: '50%',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      left: 'unset',
      transform: 'translateX(0)',
    }
  },
  title: {
    fontFamily: '"Charmonman", cursive',
    padding: '1.3rem',
    color: theme.palette.primary.main
  },
  titleColor: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    display: 'block',
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
      marginTop: 0
    }
  }
}));

const AuthContainer = () => {
  const classes = useStyles();
  return (
    <main className={classes.background}>
      <Paper elevation={10} className={classes.content}>
        <Grid container>
          <Grid item container xs={12} sm={1} alignItems="flex-start">
            <Link to={ROUTES.LANDINGPAGE} title="Powrót do strony głównej" className={classes.arrowBackLink}>
              <IconButton variant="outlined">
                <ArrowBackIcon style={{ fontSize: '1.3rem' }}/>
              </IconButton>
            </Link>
          </Grid>
          <Grid item container xs={12} sm={10} justify="center" alignItems="center" style={{ marginBottom: 40 }}>
            <Typography variant="h3" component="h1" align="center" className={classes.title}>
              Zaplanuj <span className={classes.titleColor}>Jedzonko</span>
            </Typography>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>          
        <Grid container>
          <Grid item xs={false} sm={2} md={3} />
          <Grid item container xs={12} sm={8} md={6}>
            <Switch>
              <Route exact path={ROUTES.LOGIN} component={LogIn} />
              <Route path={ROUTES.SIGNUP} component={SignUp} />
              <Route path={ROUTES.FORGOTPWD} component={ForgotPwd} />
              <Redirect from="*" to={ROUTES.ERROR} />
            </Switch>
          </Grid>
          <Grid item xs={false} sm={2} md={3} />
        </Grid>
      </Paper>
    </main>
  );
}
 
export default AuthContainer;