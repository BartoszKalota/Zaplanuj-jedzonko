import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withFirebase } from '../../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import * as ROUTES from '../../../config/ROUTES';

const useStyles = makeStyles(theme => ({
  operationTypeHeading: {
    width: '100%',
    textAlign: 'center',
    margin: theme.spacing(2, 0)
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
    '& > div': {
      margin: theme.spacing(2, 0)
    }
  },
  inputIcon: {
    margin: theme.spacing(0, 1, 0.5, 0)
  },
  errorMsg: {
    color: theme.palette.error.main
  },
  submitBtn: {
    color: theme.palette.white,
    fontSize: '1.3rem',
    padding: theme.spacing(1, 4)
  },
  otherOptions: {
    width: '100%',
    textAlign: 'center',
    '& a:hover': {
      color: theme.palette.secondary.main
    }
  }
}));

const LogIn = ({ firebase }) => {
  const classes = useStyles();
  const history = useHistory();
  const valuesInitialState = {
    email: '',
    password: '',
    showPassword: false,
  };
  const [values, setValues] = useState({ ...valuesInitialState });
  const errorsInitialState = {
    email: '',
    password: '',
    login: '' // informacja o nieprawidłowym loginie (gdy Firebase wyrzuci błąd)
  };
  const [errors, setErrors] = useState({ ...errorsInitialState });
  const [isPending, setIsPending] = useState(false);

  const handleOnChange = ({target: {name, value}}) => {
    setValues({
      ...values,
      [name]: value
    });
  };
  const handleOnShowPassword = () => {
    setValues(prevState => ({
      ...values,
      showPassword: !prevState.showPassword
    }));
  };
  const handleOnBlur = ({target: {name}}) => {
    setErrors({
      ...errors,
      [name]: ''  // żeby po odkliknięciu poprawionego inputa, komunikat o błędzie nie drażnił
    });
  };
  const validateInputs = () => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Pole "Adres email" nie może zostać puste.';
    }
    if (!values.password) {
      errors.password = 'Pole "Hasło" nie może zostać puste.';
    }
    setErrors(errors);
    if (!!Object.entries(errors).length) {  // sprawdzenie, czy obiekt błędów jest pusty
      return false;
    }
    return true;
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const isValidated = validateInputs();
    if (isValidated) {
      setIsPending(true);
      firebase
        .doSignInWithEmailAndPassword(values.email, values.password)
        .then(() => {
          setValues({ ...valuesInitialState });
          setErrors({ ...errorsInitialState });
          setIsPending(false);
          history.push(ROUTES.DESKTOP);
        })
        .catch(err => {
          console.log(err);
          setErrors({ login: 'Niepoprawny adres email lub hasło.' });
          setIsPending(false);
        });
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.operationTypeHeading}>
        Logowanie
      </Typography>
      <form onSubmit={handleOnSubmit} className={classes.form}>
        <Grid item container alignItems="flex-end" wrap="nowrap">
          <EmailIcon className={classes.inputIcon} />
          <FormControl color="secondary" fullWidth>
            <InputLabel htmlFor="email">Adres email</InputLabel>
            <Input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </FormControl>
        </Grid>
        {errors.email && (
          <Typography component="p" className={classes.errorMsg}>
            {errors.email}
          </Typography>
        )}
        <Grid item container alignItems="flex-end" wrap="nowrap">
          <LockIcon className={classes.inputIcon} />
          <FormControl color="secondary" fullWidth>
            <InputLabel htmlFor="password">Hasło</InputLabel>
            <Input
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleOnShowPassword}
                    style={{ padding: 0 }}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {errors.password && (
          <Typography component="p" className={classes.errorMsg}>
            {errors.password}
          </Typography>
        )}
        {errors.login && (
          <Typography component="p" align="center" className={classes.errorMsg}>
            {errors.login}
          </Typography>
        )}
        <Grid item container justify="center" alignItems="center" style={{ position: 'relative' }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isPending}
            className={classes.submitBtn}
          >
            Zaloguj
          </Button>
          {isPending && <CircularProgress color="secondary" style={{ position: 'absolute' }} />}
        </Grid>
      </form>
      <div className={classes.otherOptions}>
        <Link to={ROUTES.SIGNUP}>
          <Typography variant="body1" paragraph>
            Nie masz jeszcze konta? Załóż je tutaj.
          </Typography>
        </Link>
        <Link to={ROUTES.FORGOTPWD}>
          <Typography variant="body1" paragraph>
            Zapomniałeś hasła?
          </Typography>
        </Link>
      </div>
    </>
  );
}
 
export default withFirebase(LogIn);