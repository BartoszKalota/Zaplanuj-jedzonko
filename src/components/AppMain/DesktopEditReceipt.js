import React, { useContext } from 'react';

import { IdClipboard } from '../../config/contexts/IdClipboard';

const DesktopEditReceipt = () => {
  const { clipboardRowId } = useContext(IdClipboard);
  console.log(clipboardRowId)
  return (
    <h1>DesktopEditReceipt</h1>
  );
}
 
export default DesktopEditReceipt;