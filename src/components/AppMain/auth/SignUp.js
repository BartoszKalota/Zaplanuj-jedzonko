import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withFirebaseHOC } from '../../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import * as ROUTES from '../../../config/ROUTES';
import DialogModal from './Dialog';

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
    color: '#FFF',
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

const SignUp = ({ firebase }) => {
  const classes = useStyles();
  const history = useHistory();
  const valuesInitialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    checked: false
  };
  const [values, setValues] = useState({ ...valuesInitialState });
  const errorsInitialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    checked: '',
    duplicatedEmail: '' // informacja, że w Firebase istnieje już podany email (gdy Firebase wyrzuci błąd)
  };
  const [errors, setErrors] = useState({ ...errorsInitialState });
  const [isPending, setIsPending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
  const handleOnCheck = () => {
    setValues(prevState => ({
      ...values,
      checked: !prevState.checked
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
    if (values.name.length < 3) {
      errors.name = 'Twoje imię musi zawierać minimum 3 znaki.';
    }
    if (!values.email) {
      errors.email = 'Pole "Adres email" nie może zostać puste.';
    }
    if (values.password.length < 6) {
      errors.password = 'Twoje hasło musi zawierać minimum 6 znaków.';
    }
    if (!values.confirmPassword || values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Hasło musi być identyczne z tym powyżej.';
    }
    if (!values.checked) {
      errors.checked = 'W celu rejestracji konta należy zaakceptować warunki.';
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
      firebase.auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(res => res.user.updateProfile({
            displayName: values.name
        }))
        .then(() => {
          setValues({ ...valuesInitialState });
          setErrors({ ...errorsInitialState });
          setIsPending(false);
          setIsDialogOpen(true);    // przekierowanie na stronę LogIn w handleOnDialogClose
        })
        .catch(err => {
          console.log(err);
          if (err.code === 'auth/email-already-in-use') {
            setErrors({ duplicatedEmail: 'Podany adres email jest już używany. Użyj innego adresu email.' });
          } else {
            alert('Błąd połączenia! Zajrzyj do konsoli.');
          }
          setIsPending(false);
        });
    }
  };
  const handleOnDialogClose = () => {
    setIsDialogOpen(false);
    history.push(ROUTES.LOGIN);
  };

  // Informacja do okna dialogowego
  const infoTitle = 'Konto zarejestrowane!';
  const infoMsg = 'Po zamknięciu tego okna dialogowego znajdziesz się na stronie do logowania. Zaloguj się na swoje konto, aby skorzystać z aplikacji.';

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.operationTypeHeading}>
        Rejestracja
      </Typography>
      <form onSubmit={handleOnSubmit} className={classes.form}>
        <Grid item container alignItems="flex-end" wrap="nowrap">
          <AccountCircleIcon className={classes.inputIcon} />
          <FormControl color="secondary" fullWidth>
            <InputLabel htmlFor="name">Imię</InputLabel>
            <Input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </FormControl>
        </Grid>
        {errors.name && (
          <Typography component="p" className={classes.errorMsg}>
            {errors.name}
          </Typography>
        )}
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
        <Grid item container alignItems="flex-end" wrap="nowrap">
          <LockIcon className={classes.inputIcon} />
          <FormControl color="secondary" fullWidth>
            <InputLabel htmlFor="confirmPassword">Powtórz hasło</InputLabel>
            <Input
              id="confirmPassword"
              type={values.showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
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
        {errors.confirmPassword && (
          <Typography component="p" className={classes.errorMsg}>
            {errors.confirmPassword}
          </Typography>
        )}
        <Grid item container alignItems="flex-end" wrap="nowrap">
          <FormControlLabel
            control={
              <Checkbox
                name="checked"
                checked={values.checked}
                onChange={handleOnCheck}
                onBlur={handleOnBlur}
              />
            }
            style={{ marginLeft: 20, marginBottom: 0 }}
            label="Akceptuję warunki rejestracji i korzystania z konta."
          />
        </Grid>
        {errors.checked && (
          <Typography component="p" className={classes.errorMsg}>
            {errors.checked}
          </Typography>
        )}
        {errors.duplicatedEmail && (
          <Typography component="p" className={classes.errorMsg}>
            {errors.duplicatedEmail}
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
            Zarejestruj
          </Button>
          {isPending && <CircularProgress color="secondary" style={{ position: 'absolute' }} />}
        </Grid>
      </form>
      <div className={classes.otherOptions}>
        <Link to={ROUTES.LOGIN}>
          <Typography variant="body1" paragraph>
            Masz już konto? Zaloguj się.
          </Typography>
        </Link>
      </div>

      {/* Okno dialogowe z info o udanej rejestracji i przekierowaniu */}
      <DialogModal
        infoTitle={infoTitle}
        infoMsg={infoMsg}
        isDialogOpen={isDialogOpen}
        onDialogClose={handleOnDialogClose}
      />
    </>
  );
}
 
export default withFirebaseHOC(SignUp);