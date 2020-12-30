/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box } from '@chakra-ui/react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { DRAG_TYPES } from '../../constants/blocks';

interface Props {
  name: string;
  width: number;
  height: number;
  top: number;
  left: number;
  children: React.ReactNode;
}

export const Block = ({
  name,
  width,
  height,
  top,
  left,
  children,
  ...restProps
}: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: DRAG_TYPES.BLOCK },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Box
      ref={drag}
      position="absolute"
      width={width}
      height={height}
      top={top}
      left={left}
      opacity={opacity}
      bgColor="gray.300"
      border="1px solid gray.500"
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Block;
