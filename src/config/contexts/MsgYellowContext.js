import React, { createContext, useState } from 'react';

export const MsgYellowContext = createContext();

// Używam contextu, bo przy przekazaniu informacji o ilości planów do góry (z komponentu tabeli do desktopa), kręciołek (pending state) nie znika
const MsgYellowContextProvider = ({ children }) => {
  const [schedulesNum, setSchedulesNum] = useState('');
  return (
    <MsgYellowContext.Provider value={{ schedulesNum, setSchedulesNum }}>
      {children}
    </MsgYellowContext.Provider>
  );
}

export default MsgYellowContextProvider;