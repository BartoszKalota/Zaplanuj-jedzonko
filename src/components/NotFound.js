import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import bgImg from '../assets/bg.png';

import * as ROUTES from '../config/ROUTES';

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
  },
  heading: {
    textAlign: 'center',
    margin: theme.spacing(2, 0)
  }
}));

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnClick = () => history.goBack();

  useEffect(() => {
    document.title = 'Zaplanuj Jedzonko - Błąd 404';
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
          <Grid item container xs={12} sm={8} md={6} direction="column" justify="center">
            <Typography variant="h4" component="h2" className={classes.heading}>
              Błąd 404
            </Typography>
            <Typography variant="h6" component="h3" className={classes.heading}>
              (Nie ma takiej strony)
            </Typography>
          </Grid>
          <Grid item xs={false} sm={2} md={3} />
        </Grid>
      </Paper>
    </main>
  );
}
 
export default NotFound;