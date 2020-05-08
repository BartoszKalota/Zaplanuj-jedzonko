import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const AlertInfo = () => {
  const [open, setOpen] = useState(true);     // docelowo zarządzanie odbędzie się przez context
  const [displayValue, setDisplayValue] = useState(open);

  // Dzięki temu, wraz z alertem zniknie div wrapujący ten alert i zwolni przestrzeń
  // Opóźnienie ma na celu wyświetlenie pełnej animacji
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayValue(open)
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [open]);

  return (
    <div style={{ width: '100%', display: displayValue ? 'block' : 'none' }}>
      <Collapse in={open}>
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
          Masz już 99 przepisów, nieźle!
        </Alert>
      </Collapse>
    </div>
  );
}
 
export default AlertInfo;