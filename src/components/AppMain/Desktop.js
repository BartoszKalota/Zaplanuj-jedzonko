import React, { useContext } from 'react';

import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';

import DesktopMain from './DesktopMain';
import DesktopAddReceipt from './DesktopAddReceipt';
import DesktopAddSchedule from './DesktopAddSchedule';
import DesktopEditReceipt from './DesktopEditReceipt';
import DesktopEditSchedule from './DesktopEditSchedule';

const Desktop = () => {
  const { desktopMode } = useContext(DesktopSwitcher);

  if (desktopMode === 2) {
    return <DesktopAddReceipt />;
  }
  if (desktopMode === 3) {
    return <DesktopAddSchedule />;
  }
  if (desktopMode === 4) {
    return <DesktopEditReceipt />
  }
  if (desktopMode === 5) {
    return <DesktopEditSchedule />
  }
  return <DesktopMain />;
};
 
export default Desktop;