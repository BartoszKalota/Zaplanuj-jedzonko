import React, { createContext, useState } from 'react';

export const DesktopSwitcher = createContext();

const DesktopSwitcherProvider = ({ children }) => {
  const [desktopMode, setDesktopMode] = useState(1);
  return (
    <DesktopSwitcher.Provider value={{ desktopMode, setDesktopMode }}>
      {children}
    </DesktopSwitcher.Provider>
  );
}
 
export default DesktopSwitcherProvider;