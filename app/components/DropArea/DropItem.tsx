/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import { DRAG_TYPES } from '../../constants/blocks';

interface Props {
  width: number;
  height: number;
  row: number;
  index: number;
}

export const DropItem = ({
  width,
  height,
  row,
  index,
  ...restProps
}: Props) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DRAG_TYPES.BLOCK,
    drop: () => ({ name: 'Tab' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  const bg = isActive ? 'rgba(0,100,0,0.5)' : 'rgba(0,50,0,0.5)';

  return (
    <Box
      ref={drop}
      width={width}
      height={height}
      bgColor={bg}
      border="1px solid rgba(0,50,0,0.7)"
      {...restProps}
    />
  );
};

export default DropItem;
