import React from 'react';
import { Block } from '../../reducers/currentSlice';

interface Props {
  action: Block['action'];
}

export const BookmarkBlock = ({ action }: Props) => {
  return <div>{action.type}</div>;
};

export default BookmarkBlock;
