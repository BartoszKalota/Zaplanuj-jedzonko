import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,  // Pola typu password potrzebują własnego elementu FormControl do poprawnego wyświetlania
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

const LogIn = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  // const [errors, setErrors] = useState({
  //   email: '',
  //   password: ''
  // });

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
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // const errors = {};
    // if (!values.email) {
    //   errors.email = 'Pole "Adres email" nie może zostać puste.';
    // }
    // if (!values.password) {
    //   errors.password = 'Pole "Hasło" nie może zostać puste.';
    // }
    // setErrors(errors);
    if (values.email && values.password) {    // Wkrótce nastąpi autoryzacja poprzez Firebase
      console.log(values);
      setValues({
        ...values,
        email: '',
        password: ''
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
          <TextField
            label="Adres email"
            color="secondary"
            type="email"
            name="email"
            value={values.email}
            onChange={handleOnChange}
            fullWidth
          />
        </Grid>
        <Grid item container alignItems="flex-end" wrap="nowrap">
          <LockOpenIcon className={classes.inputIcon} />
          <FormControl color="secondary" fullWidth>
            <InputLabel htmlFor="password">Hasło</InputLabel>
            <Input
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              onChange={handleOnChange}
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
        <Grid item container justify="center">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.submitBtn}
          >
            Zaloguj
          </Button>
        </Grid>
      </form>
      <div className={classes.otherOptions}>
        <Link to="/app/signup">
          <Typography variant="body1" paragraph>
            Nie masz jeszcze konta? Załóż je tutaj.
          </Typography>
        </Link>
        <Link to="/app/forgotpwd">
          <Typography variant="body1" paragraph>
            Zapomniałeś hasła?
          </Typography>
        </Link>
      </div>
    </>
  );
}
 
export default LogIn;