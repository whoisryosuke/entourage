import React from 'react';
import { Block } from '../../reducers/currentSlice';
import CommandBlock from './CommandBlock';
import BookmarkBlock from './BookmarkBlock';

interface Props {
  action: Block['action'];
}

export const BlockContent = ({ action }: Props) => {
  console.log('action in block content', action);
  switch (action.type) {
    case 'command':
      return <CommandBlock action={action} />;
    case 'bookmark':
      return <BookmarkBlock action={action} />;

    default:
      return <div>No block found with that type.</div>;
  }
};

export default BlockContent;
