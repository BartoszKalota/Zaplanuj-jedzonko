import firebase from 'firebase/app';
import 'firebase/auth';       // potrzebne do autoryzacji
import 'firebase/firestore';  // potrzebne do połączenia z bazą danych (Database)
import 'firebase/storage';    // potrzebne do połączenia ze zbiorem plików (Storage)

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }
  // Autoryzacja
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSendPasswordResetEmail = (email) => this.auth.sendPasswordResetEmail(email);
  doSignOut = () => this.auth.signOut();
  // Dane użytkownika
  user = () => this.auth.currentUser.uid;
}

export default Firebase;