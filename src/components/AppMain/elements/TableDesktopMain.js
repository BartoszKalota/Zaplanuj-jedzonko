import React, { useState, useEffect } from 'react';
import { withFirebaseHOC } from '../../../config/Firebase';
import { Typography } from '@material-ui/core';

// Kolumny
const columns = [
  { id: 'mon', label: 'poniedziałek', align: 'center', width: '14.8%', minWidth: 120 },
  { id: 'tue', label: 'wtorek', align: 'center', width: '14.2%', minWidth: 100 },
  { id: 'wed', label: 'środa', align: 'center', width: '14.2%', minWidth: 100 },
  { id: 'thu', label: 'czwartek', align: 'center', width: '14.2%', minWidth: 100 },
  { id: 'fri', label: 'piątek', align: 'center', width: '14.2%', minWidth: 100 },
  { id: 'sat', label: 'sobota', align: 'center', width: '14.2%', minWidth: 100 },
  { id: 'sun', label: 'niedziela', align: 'center', width: '14.2%', minWidth: 100 }
];

const TableDesktopMain = ({ firebase }) => {
  const [schedules, setSchedules] = useState([]);
  const [rows, setRows] = useState([]);

  // Zbiór planów (dane z Firebase)
  const userId = firebase.auth().currentUser.uid;
  useEffect(() => {
    const schedules = [];
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('schedules')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const { weekNum, schedule } = doc.data();
          schedules.push({
            firebaseId: doc.id,
            weekNum,
            schedule
          });
          schedules.sort((a, b) => a.weekNum - b.weekNum);
          setSchedules(schedules);
        });
      })
      .then(() => {
        const { schedule } = schedules[0];
        const createSingleObject = (mealType) => {
          return Object.keys(schedule)
            .filter(key => key.includes(mealType))
            .reduce((obj, key) => {
              obj[key] = schedule[key];
              return obj;
            }, {});
        };
        const breakfasts = createSingleObject('breakf');
        const secondBreakfasts = createSingleObject('secBr');
        const soups = createSingleObject('soup');
        const dinners = createSingleObject('dinner');
        const suppers = createSingleObject('supper');
        const array = [breakfasts, secondBreakfasts, soups, dinners, suppers];
        setRows(array);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
      });
  }, [firebase, userId]);

  return (
    <Typography variant="h3" component="h1">Desktop</Typography>
  );
}
 
export default withFirebaseHOC(TableDesktopMain);