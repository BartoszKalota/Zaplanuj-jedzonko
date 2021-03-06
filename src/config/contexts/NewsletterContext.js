import React, { createContext, useState } from 'react';
import { withFirebase } from '../Firebase';

export const NewsletterContext = createContext();

const NewsletterContextProvider = ({ firebase, children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const sendToFirebase = (email) => {
    console.log(firebase)
    setIsPending(true);
    firebase.db
      .collection('newsletter')
      .add({
        email
      })
      .then(() => {
        setIsSubmitted(true);
        setIsPending(false);
      })
      .catch(err => {
        console.warn('Błąd zapisu emaila w Firebase z kontekstu Newslettera:', err)
        setIsPending(false);
      });
  };
  
  return (
    <NewsletterContext.Provider value={{ isSubmitted, isPending, sendToFirebase }}>
      {children}
    </NewsletterContext.Provider>
  );
}

export default withFirebase(NewsletterContextProvider);