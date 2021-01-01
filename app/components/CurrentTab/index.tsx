import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { selectCurrentTab } from '../../reducers/currentSlice';
import { DropArea } from '../DropArea';
import { Block } from '../Block';
import { generateSlots } from '../AddBlockMenu';
import { BlockContent } from '../BlockContent';
import { BlockEditDrawer } from '../BlockEditDrawer';

interface Props {}

export const CurrentTab = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editBlockId, setEditBlockId] = useState(0);
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
            openDrawer={onOpen}
            setEditBlockId={setEditBlockId}
          >
            <BlockContent name={name} action={action} />
          </Block>
        );
      })}

      {tab?.blocks && tab.blocks.length > 0 && (
        <BlockEditDrawer
          isOpen={isOpen}
          onClose={onClose}
          selectedBlock={tab.blocks[editBlockId]}
          editBlockId={editBlockId}
        />
      )}
    </Box>
  );
};

export default CurrentTab;
