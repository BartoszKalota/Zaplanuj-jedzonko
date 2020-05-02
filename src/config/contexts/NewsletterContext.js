import React, { createContext, useState } from 'react';
import { withFirebaseHOC } from '../Firebase';

export const NewsletterContext = createContext();

const NewsletterContextProvider = ({ firebase, children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendToFirebase = (email) => {
    firebase.firestore()
      .collection('newsletter')
      .add({
        email
      })
      .then(() => setIsSubmitted(true))
      .catch(err => console.warn(`Błąd zapisu emaila w Firebase z kontekstu Newslettera: ${err}`));
  };
  
  return (
    <NewsletterContext.Provider value={{ isSubmitted, sendToFirebase }}>
      {children}
    </NewsletterContext.Provider>
  );
}

export default withFirebaseHOC(NewsletterContextProvider);