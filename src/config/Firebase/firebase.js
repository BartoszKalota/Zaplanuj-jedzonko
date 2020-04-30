import firebase from 'firebase/app';
import 'firebase/auth';       // potrzebne do autoryzacji
import 'firebase/firestore';  // potrzebne do połączenia z bazą danych
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default firebase;