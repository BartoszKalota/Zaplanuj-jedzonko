import React, { createContext, useState } from 'react';

export const MsgGreenContext = createContext();

const MsgGreenContextProvider = ({ children }) => {
  const [isOn, setIsOn] = useState(true);
  return (
    <MsgGreenContext.Provider value={{ isOn, setIsOn }}>
      {children}
    </MsgGreenContext.Provider>
  );
}

export default MsgGreenContextProvider;