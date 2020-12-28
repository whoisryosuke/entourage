import React, { useRef, useState, useLayoutEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectCurrentTab } from '../../reducers/currentSlice';

interface Props {}

export const CurrentTab = (props: Props) => {
  const [gridItemSize, setGridItemSize] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  // const tab = useSelector(selectCurrentTab);
  const tab = [
    // Command Line Block
    {
      name: 'Start Server',
      description: 'Starts the development server on port 8080',
      action: {
        type: 'command',
        data: ['npm run dev', 'npm run lint'],
        directory: '',
        confirmation: false,
      },
      position: {
        x: 0,
        y: 0,
        width: 2,
        height: 2,
      },
      appearance: {
        icon: {
          type: 'standard',
          color: '#F0F0F0',
        },
        highlight: '#F0F0F0',
      },
    },

    // File Explorer
    {
      name: 'Project folder',
      description: 'The primary folder',
      action: {
        type: 'file-explorer',
        directory: '/projects/project-1/',
      },
      position: {
        x: 2,
        y: 0,
        width: 2,
        height: 2,
      },
      appearance: {
        icon: {
          type: 'standard',
          color: '#F0F0F0',
        },
        highlight: '#F0F0F0',
      },
    },

    // File Explorer
    {
      name: 'Project folder',
      description: 'The primary folder',
      action: {
        type: 'file-explorer',
        directory: '/projects/project-1/',
      },
      position: {
        x: 4,
        y: 0,
        width: 2,
        height: 2,
      },
      appearance: {
        icon: {
          type: 'standard',
          color: '#F0F0F0',
        },
        highlight: '#F0F0F0',
      },
    },
  ];

  const handleResize = () => {
    const offset = containerRef.current?.getBoundingClientRect();
    const subtractOffset = offset?.top ?? 300;
    const gridItemWidth = window.innerWidth / 16;
    const gridItemHeight = (window.innerHeight - subtractOffset) / 8;
    setGridItemSize({
      width: gridItemWidth,
      height: gridItemHeight,
    });
    console.log('calc', offset, gridItemSize, window.innerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener('onload', handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('onload', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return (
    <Box ref={containerRef} position="relative" width="100%">
      {/* Drop Area */}

      {/* Blocks */}
      {tab?.map(({ name, position }) => (
        <Box
          position="absolute"
          width={gridItemSize.width * position.width}
          height={gridItemSize.height * position.height}
          top={gridItemSize.width * position.x}
          left={gridItemSize.height * position.y}
        >
          <Text>{name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default CurrentTab;
