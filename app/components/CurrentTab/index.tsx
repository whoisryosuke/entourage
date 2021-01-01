import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectCurrentTab } from '../../reducers/currentSlice';
import { DropArea } from '../DropArea';
import { Block } from '../Block';
import { generateSlots } from '../AddBlockMenu';
import { BlockContent } from '../BlockContent';

interface Props {}

export const CurrentTab = (props: Props) => {
  const [gridItemSize, setGridItemSize] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const tab = useSelector(selectCurrentTab);

  const handleResize = useCallback(() => {
    const offset = containerRef.current?.getBoundingClientRect();
    const subtractOffset = offset?.top ?? 300;
    const gridItemWidth = window.innerWidth / 16;
    const gridItemHeight = (window.innerHeight - subtractOffset) / 8;
    setGridItemSize({
      width: gridItemWidth,
      height: gridItemHeight,
    });
  }, [containerRef]);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('onload', handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('onload', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const freeSlots = generateSlots(tab?.blocks ?? []);

  return (
    <Box ref={containerRef} position="relative" width="100%">
      {/* Drop Area */}
      <DropArea
        gridWidth={gridItemSize.width}
        gridHeight={gridItemSize.height}
      />

      {/* Blocks */}
      {tab?.blocks.map(({ name, position, action }, index) => {
        return (
          <Block
            key={name}
            name={name}
            index={index}
            gridWidth={position.width}
            gridHeight={position.height}
            width={gridItemSize.width * position.width}
            height={gridItemSize.height * position.height}
            top={gridItemSize.height * position.y}
            left={gridItemSize.width * position.x}
            freeSlots={freeSlots}
          >
            <BlockContent name={name} action={action} />
          </Block>
        );
      })}
    </Box>
  );
};

export default CurrentTab;
