import React from 'react';
import { Block } from '../../reducers/currentSlice';

interface Props {
  action: Block['action'];
}

export const ImageBlock = ({ action }: Props) => {
  const image = `file://${__dirname}/media/test.jpeg`;
  console.log('image', image);
  return <img src={image} alt="Test" />;
};

export default ImageBlock;
