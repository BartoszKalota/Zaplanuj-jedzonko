import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  wrapper: {
    '& .MuiAlert-filledInfo': {
      fontSize: '1rem',
      fontWeight: 900
    }
  }
});

const AlertInfo = ({ receiptsNum }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [displayValue, setDisplayValue] = useState(open);

  // Dzięki temu, wraz z alertem zniknie div wrapujący ten alert i zwolni przestrzeń
  // Opóźnienie ma na celu wyświetlenie pełnej animacji
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayValue(open)
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [open]);

  let wordEnding = receiptsNum === 1 ? 's' : 'sy';
  if (receiptsNum > 4) {
    wordEnding = 'sów';
  }

  return (
    <div style={{ width: '100%', display: displayValue ? 'block' : 'none' }}>
      <Collapse in={open} className={classes.wrapper}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="info"
          variant="filled"
          elevation={6}
        >
          {receiptsNum === 0
            ? (`Masz 0 przepisów.`)
            : (`Masz już ${receiptsNum} przepi${wordEnding}, nieźle!`)}
        </Alert>
      </Collapse>
    </div>
  );
}
 
export default AlertInfo;