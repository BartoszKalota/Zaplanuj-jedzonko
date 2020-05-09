import React, { useContext } from 'react';

import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';

import DesktopMain from './DesktopMain';
import DesktopAddReceipt from './DesktopAddReceipt';
import DesktopAddSchedule from './DesktopAddSchedule';

const Desktop = () => {
  const { desktopMode } = useContext(DesktopSwitcher);

  if (desktopMode === 2) {
    return <DesktopAddReceipt />;
  }
  if (desktopMode === 3) {
    return <DesktopAddSchedule />;
  } 
  return <DesktopMain />;
};
 
export default Desktop;