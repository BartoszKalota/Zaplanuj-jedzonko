import React, { forwardRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core';

// Nadanie referencji reactowej oknu dialogowemu (z szablonu material-ui)
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogModal = ({ isDialogOpen, onDialogClose, infoTitle, infoMsg }) => {
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