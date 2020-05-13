import React, { createContext, useState } from 'react';

export const IdClipboard = createContext();

const IdClipboardProvider = ({ children }) => {
  const [clipboardRowId, setClipboardRowId] = useState('');
  return (
    <IdClipboard.Provider value={{ clipboardRowId, setClipboardRowId }}>
      {children}
    </IdClipboard.Provider>
  );
}

export default IdClipboardProvider;