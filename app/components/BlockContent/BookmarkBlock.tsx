import React from 'react';
import { shell } from 'electron';
import { Block } from '../../reducers/currentSlice';

interface Props {
  action: Block['action'];
}

export const BookmarkBlock = ({ action }: Props) => {
  const handleButton = () => {
    shell.openExternal(action.data.url);
  };
  return (
    <button
      type="button"
      title="Open webpage in browser"
      onClick={handleButton}
    >
      {action.data.name}
    </button>
  );
};

export default BookmarkBlock;
