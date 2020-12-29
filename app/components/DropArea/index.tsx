/* eslint-disable react/no-array-index-key */
import { Box } from '@chakra-ui/react';
import React from 'react';

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
            <Box
              key={`${rowIndex}-${index}`}
              width={gridWidth}
              height={gridHeight}
              bgColor="rgba(0,50,0,0.5)"
              border="1px solid rgba(0,50,0,0.7)"
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default DropArea;
