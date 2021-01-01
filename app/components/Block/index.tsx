/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import {
  selectEditMode,
  updateBlockPosition,
} from '../../reducers/currentSlice';
import { DRAG_TYPES } from '../../constants/blocks';

import { checkAdjacentSlots } from '../AddBlockMenu';

interface Props {
  name: string;
  width: number;
  height: number;
  gridWidth: number;
  gridHeight: number;
  top: number;
  left: number;
  index: number;
  freeSlots: any;
  children: React.ReactNode;
}

export const Block = ({
  name,
  width,
  height,
  gridWidth,
  gridHeight,
  index,
  top,
  left,
  children,
  freeSlots,
  ...restProps
}: Props) => {
  const editMode = useSelector(selectEditMode);
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: DRAG_TYPES.BLOCK },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // @TODO: Check for collision and deny request if so
        console.log(
          'checking slots',
          dropResult.index,
          dropResult.row,
          gridWidth,
          gridHeight
        );
        const newSize = checkAdjacentSlots(
          freeSlots,
          dropResult.index,
          dropResult.row,
          gridWidth,
          gridHeight
        );
        // Not too necessary because blocks cover grid, so can't drop on blocked areas
        dispatch(
          updateBlockPosition({
            index,
            position: {
              ...newSize,
              x: dropResult.index,
              y: dropResult.row,
            },
          })
        );
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Box
      ref={editMode ? drag : null}
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
