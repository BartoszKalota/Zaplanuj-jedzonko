import React from 'react';
import {
  Switch,
  Route,
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

import LogIn from './LogIn';
import SignUp from './SignUp';
import ForgotPwd from './ForgotPwd';
import NotFound from '../../NotFound';

const useStyles = makeStyles(theme => ({
  background: {
    width: '100vw',
    height: '100vh',
    padding: theme.spacing(4, 7),
    background: `url(${bgImg}) repeat`
  },
  content: {
    padding: theme.spacing(2),
    position: 'relative'
  },
  arrowBackLink: {
    position: 'absolute'
  },
  title: {
    fontFamily: '"Charmonman", cursive',
    padding: '1.3rem',
    color: theme.palette.primary.main,
    curosor: 'pointer'
  },
  titleColor: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  }
}));

const AuthContainer = () => {
  const classes = useStyles();
  return (
    <main className={classes.background}>
      <Paper elevation={10} className={classes.content}>
        <Link to="/" title="Powrót do strony głównej" className={classes.arrowBackLink}>
          <IconButton variant="outlined">
            <ArrowBackIcon style={{ fontSize: '2rem' }}/>
          </IconButton>
        </Link>
        <Grid container xs={12} justify="center" alignItems="center">
          <Typography variant="h3" component="h1" className={classes.title} noWrap>
            Zaplanuj <span className={classes.titleColor}>Jedzonko</span>
          </Typography>
        </Grid>
        <Switch>
          <Route exact path="/app" component={LogIn} />
          <Route path="/app/signup" component={SignUp} />
          <Route path="/app/forgotpwd" component={ForgotPwd} />
          <Route component={NotFound} />
        </Switch>
      </Paper>
    </main>
  );
}
 
export default AuthContainer;