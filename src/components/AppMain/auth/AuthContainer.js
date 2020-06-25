import React, { useEffect, useContext } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
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

import { MsgGreenContext } from '../../../config/contexts/MsgGreenContext';

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
    backgroundColor: theme.palette.arrowBackLinkBgrColor,
    marginBottom: theme.spacing(1),
    left: '50%',
    transform: 'translateX(-50%)',
    [theme.breakpoints.up('sm')]: {
      left: 'unset',
      transform: 'translateX(0)',
    },
    '&:hover': {
      backgroundColor: theme.palette.arrowBackLinkHoverBgrColor,
      transition: '0.3s'
    }
  },
  title: {
    fontFamily: theme.palette.fontFamilyAlt,
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

const AuthContainer = ({ history }) => {
  const classes = useStyles();
  const { setIsOn } = useContext(MsgGreenContext);

  const handleOnClick = () => history.goBack();   // nie działało przy użyciu hooka 'useHistory'
  
  useEffect(() => {
    document.title = 'Zaplanuj Jedzonko - Autoryzacja';
    return () => setIsOn(true);
  }, []);

  return (
    <main className={classes.background}>
      <Paper elevation={10} className={classes.content}>
        <Grid container>
          <Grid item container xs={12} sm={1} alignItems="flex-start">
            <IconButton variant="outlined" onClick={handleOnClick} className={classes.arrowBackLink}>
              <ArrowBackIcon style={{ fontSize: '1.3rem' }}/>
            </IconButton>
          </Grid>
          <Grid item container xs={12} sm={10} justify="center" alignItems="center" style={{ marginBottom: 40 }}>
            <Link to={ROUTES.LANDINGPAGE}>
              <Typography variant="h3" component="h1" align="center" className={classes.title}>
                Zaplanuj <span className={classes.titleColor}>Jedzonko</span>
              </Typography>
            </Link>
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