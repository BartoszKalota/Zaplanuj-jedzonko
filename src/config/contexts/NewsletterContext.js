import React, { createContext, useState } from 'react';
import { withFirebaseHOC } from '../Firebase';

export const NewsletterContext = createContext();

const NewsletterContextProvider = ({ firebase, children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const sendToFirebase = (email) => {
    setIsPending(true);
    firebase.firestore()
      .collection('newsletter')
      .add({
        email
      })
      .then(() => {
        setIsSubmitted(true);
        setIsPending(false);
      })
      .catch(err => console.warn('Błąd zapisu emaila w Firebase z kontekstu Newslettera:', err));
  };
  
  return (
    <NewsletterContext.Provider value={{ isSubmitted, isPending, sendToFirebase }}>
      {children}
    </NewsletterContext.Provider>
  );
}

export default withFirebaseHOC(NewsletterContextProvider);