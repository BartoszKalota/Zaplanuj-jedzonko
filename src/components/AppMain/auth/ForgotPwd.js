import React, { useState } from 'react';
import { withFirebaseHOC } from '../../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

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
    color: theme.palette.white,
    fontSize: '1.3rem',
    padding: theme.spacing(1, 4)
  }
}));

const ForgotPwd = ({ firebase }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOnChange = ({target: {value}}) => setEmail(value);
  const handleOnBlur = () => setError('');
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Pole "Adres email" nie może zostać puste.');
    }
    if (email && !error) {
      setIsPending(true);
      firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setEmail('');
          setIsPending(false);
          setIsDialogOpen(true);
        })
        .catch(err => {
          console.log(err);
          alert('Błąd wysłania emaila z resetem hasła! Zajrzyj do konsoli.');
          setIsPending(false);
        });
    }
  };
  const handleOnDialogClose = () => setIsDialogOpen(false);

  // Informacja do okna dialogowego
  const infoTitle = 'Wysłaliśmy do Ciebie emaila z możliwością zresetowania hasła!';
  const infoMsg = 'Sprawdź swoją skrzynkę odbiorczą i wykonaj polecenia z wiadomości od ZaplanujJedzonko-App, aby zresetować swoje hasło.';

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.operationTypeHeading}>
        Zapomniałeś hasła?
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
              value={email}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </FormControl>
        </Grid>
        {error && (
          <Typography component="p" className={classes.errorMsg}>
            {error}
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
            Resetuj hasło
          </Button>
          {isPending && <CircularProgress color="secondary" style={{ position: 'absolute' }} />}
        </Grid>
      </form>

      {/* Okno dialogowe z info o udanym wysłaniu emaila z linkiem do resetu hasła */}
      <DialogModal
        infoTitle={infoTitle}
        infoMsg={infoMsg}
        isDialogOpen={isDialogOpen}
        onDialogClose={handleOnDialogClose}
      />
    </>
  );
}
 
export default withFirebaseHOC(ForgotPwd);