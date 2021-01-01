import React from 'react';
import { Block } from '../../reducers/currentSlice';

interface Props {
  action: Block['action'];
}

export const NoteBlock = ({ action }: Props) => {
  const note =
    action.data.format === 'markdown' ? action.data.note : action.data.note;
  return <div>{note}</div>;
};

export default NoteBlock;
