import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTab } from '../../reducers/currentSlice';

interface Props {}

export const CurrentTab = (props: Props) => {
  const tab = useSelector(selectCurrentTab);
  return (
    <div>
      {/* Drop Area */}
      {JSON.stringify(tab)}

      {/* Blocks */}
    </div>
  );
};

export default CurrentTab;
