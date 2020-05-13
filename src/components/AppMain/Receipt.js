import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { withFirebaseHOC } from '../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';
import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';

import * as ROUTES from '../../config/ROUTES';
import TableEditRemoveBtns from './elements/TableEditRemoveBtns';

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'left'
  },
  buttonContainer: {
    justifyContent: 'flex-end'
  },
  addDataButton: {
    minWidth: 'unset',
    color: theme.palette.success.main,
    padding: 0,
    marginLeft: theme.spacing(1),
    '& span svg': {
      fontSize: '2.5rem'
    }
  },
  table: {
    height: 'calc(100vh - 220px)',
    overflow: 'auto'
  },
  tableHeader: {
    fontSize: '1.3rem',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.background.paper
  },
  tableRow: {
    '& td': {
      fontSize: '0.95rem'
    },
    '&:nth-child(2n+1)': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  }
}));

const Receipt = ({ firebase }) => {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const { setIsLoading } = useContext(IsLoadingContext);
  const { setDesktopMode } = useContext(DesktopSwitcher);

  // Kolumny
  const columns = [
    { id: 'id', label: 'ID', align: 'left', minWidth: 50 },
    { id: 'name', label: 'NAZWA', align: 'left', minWidth: 170 },
    { id: 'descr', label: 'OPIS', align: 'left', minWidth: 230 },
    { id: 'actions', label: 'AKCJE', align: 'center', minWidth: 90 }
  ];
  // Wiersze (dane z Firebase)
  useEffect(() => {
    setIsLoading(true);
    const array = [];
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const { name, descr } = doc.data(); // potrzebujemy tylko kilku danych (nie wszystkich)
          array.push({
            id: doc.id,
            name,
            descr
          })
        })
      })
      .then(() => {
        setRows(array);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  }, [firebase, setIsLoading]);

  const handleOnAddData = () => {
    setDesktopMode(2);
    history.push(ROUTES.DESKTOP);
  };
  const handleOnDeleteReceipt = (rowId) => {
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .doc(rowId)
      .delete()
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
      });
  };
  const handleOnEditReceipt = (rowId) => {
    console.log(rowId, 'edit');
  };

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={6}>
          <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
            LISTA PRZEPISÓW
          </Typography>
        </Grid>
        <Grid item container className={classes.buttonContainer} xs={6}>
          <Button className={classes.addDataButton} onClick={handleOnAddData}>
            <AddBoxIcon />
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid item container>
        <TableContainer component={Paper} className={classes.table}>
          <Table stickyHeader aria-label="table">
            <TableHead>
              <TableRow>
                {columns.map(({ id, label, align, minWidth }) => (
                  <TableCell
                    key={id}
                    align={align}
                    style={{ minWidth }}
                    className={classes.tableHeader}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? (
                rows.map((row, index) => (
                  <TableRow key={row.id} data-id={row.id} className={classes.tableRow}>
                    {columns.map(column => {
                      let value = row[column.id];   // wartości pól column.id muszą być takie same jak te, które przyszły z Firebase ( array.push({ id, name, descr }) )
                      if (column.id === 'id') {
                        value = index + 1;
                      }
                      if (column.id === 'actions') {
                        value = (
                          <TableEditRemoveBtns
                            onEdit={handleOnEditReceipt}
                            onDelete={handleOnDeleteReceipt}
                          />
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow className={classes.tableRow}>
                  <TableCell align="center" colSpan={columns.length}>
                    Brak przepisów do wyświetlenia
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default withFirebaseHOC(Receipt);