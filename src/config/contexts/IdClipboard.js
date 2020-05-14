import React, { createContext, useState } from 'react';

export const IdClipboard = createContext();

const IdClipboardProvider = ({ children }) => {
  const [clipboardFirebaseId, setClipboardFirebaseId] = useState('');
  return (
    <IdClipboard.Provider value={{ clipboardFirebaseId, setClipboardFirebaseId }}>
      {children}
    </IdClipboard.Provider>
  );
}

export default IdClipboardProvider;