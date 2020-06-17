import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import { MsgGreenContext } from '../../../config/contexts/MsgGreenContext';

const useStyles = makeStyles({
  wrapper: {
    '& .MuiAlert-filledSuccess': {
      fontSize: '1rem',
      fontWeight: 900
    }
  }
});

const AlertSucc = () => {
  const classes = useStyles();
  const { setIsOn } = useContext(MsgGreenContext);
  const [open, setOpen] = useState(true); // potrzebne, bo bazując na kontekście (isOn) nie działa animacja zamykania okna
  const [displayValue] = useState(open);
  const [timeoutId, setTimeoutId] = useState('');

  const handleOnClick = () => {
    setOpen(false);
    // Opóźnienie ma na celu wyświetlenie pełnej animacji
    const timeFunct = setTimeout(() => {
      setIsOn(false);
    }, 500);
    setTimeoutId(timeFunct);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{ width: '100%', display: displayValue ? 'block' : 'none' }}>
      <Collapse in={open} className={classes.wrapper}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOnClick}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="success"
          variant="filled"
          elevation={6}
        >
          Świetnie, że jesteś! Udanego planowania i smacznego! <EmojiEmotionsIcon style={{ display: 'inline', fontSize: '1.2rem' }} />
        </Alert>
      </Collapse>
    </div>
  );
}
 
export default AlertSucc;