/* eslint-disable react/no-array-index-key */
import { Box } from '@chakra-ui/react';
import React from 'react';
import { DropItem } from './DropItem';

interface Props {
  gridWidth: number;
  gridHeight: number;
}

export const DropArea = ({ gridWidth, gridHeight }: Props) => {
  const columns = Array(16).fill(0);
  const rows = Array(8).fill(columns);
  return (
    <Box
      id="DropArea"
      width="100%"
      display="flex"
      flexDirection="column"
      position="absolute"
      top={0}
      left={0}
      opacity="50%"
    >
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex} width="100%" display="flex">
          {row.map((column, index) => (
            <DropItem
              key={`grid-item-${rowIndex}-${index}`}
              width={gridWidth}
              height={gridHeight}
              row={rowIndex}
              index={index}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default DropArea;
