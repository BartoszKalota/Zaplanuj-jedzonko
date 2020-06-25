import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.success.main,
    fontSize: '2rem',
    marginRight: 10
  }
}));

// Nadanie referencji reactowej oknu dialogowemu (z szablonu material-ui)
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogModal = ({ isDialogOpen, onDialogClose, infoTitle, infoMsg }) => {
  const classes = useStyles();
  const handleOnClick = () => onDialogClose();
  return (
    <Dialog
      open={isDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <CheckCircleIcon className={classes.icon} />
        {infoTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {infoMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleOnClick}
          style={{ color: '#FFF' }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;