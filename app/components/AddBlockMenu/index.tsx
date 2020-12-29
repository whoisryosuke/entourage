import React from 'react';
import {
  BsCheckBox,
  BsPlusSquare,
  BsBookmark,
  BsImage,
  BsTerminal,
  BsChevronDown,
  BsFileText,
} from 'react-icons/bs';
import { VscListTree } from 'react-icons/vsc';
import {
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addBlockToTab, selectCurrentTab } from '../../reducers/currentSlice';
import { BLOCK_TYPES, BLOCK_SAMPLES } from '../../constants/blocks';

interface Props {}

const generateCoordinates = (blocks) => {
  let startPosition = {
    x: 0,
    y: 0,
    width: 2,
    height: 2,
  };
  // Create arrays for all grid positions and mark all as unused for now
  const freeXSlots = new Array(16).fill(true);
  const freeYSlots = new Array(8).fill(true);

  console.log('start position', startPosition);
  console.log('free positions', freeXSlots, freeYSlots);
  // Loop through blocks and mark grid positions as used
  blocks.map(({ position }) => {
    for (let i = position.x; i <= position.x + position.width; i++) {
      console.log('position taken', i);
      freeXSlots[i] = false;
    }
    for (let i = position.y; i <= position.y + position.height; i++) {
      freeYSlots[i] = false;
    }
  });

  // Find first x and see if it works
  const firstX = freeXSlots.findIndex((item) => item === true);
  console.log(
    'first x index',
    firstX !== null && firstX + startPosition.width <= 16
  );
  if (firstX !== null && firstX + startPosition.width <= 16) {
    startPosition = {
      ...startPosition,
      x: firstX,
    };
  } else {
    throw new Error('No free slots horizontally');
  }

  // Find first y and see if it works
  const firstY = freeYSlots.findIndex((item) => item === true);
  if (firstY !== null && firstY + startPosition.height <= 8) {
    startPosition = {
      ...startPosition,
      y: firstY,
    };
  } else {
    throw new Error('No free slots vertically');
  }

  console.log('updated free positions', freeXSlots, freeYSlots);
  console.log('new position', startPosition);
  return startPosition;
};

export const AddBlockMenu = (props: Props) => {
  const { blocks } = useSelector(selectCurrentTab);
  const dispatch = useDispatch();

  const handleAddBlock = (blockType) => {
    const coordinates = generateCoordinates(blocks);
    dispatch(
      addBlockToTab({
        name: 'Execute Command',
        description: 'A sample command',
        action: BLOCK_SAMPLES[blockType],
        position: {
          ...coordinates,
        },
        appearance: {
          icon: {
            type: 'standard',
            color: '#FFF',
          },
          highlight: '#FFF',
        },
      })
    );
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<BsPlusSquare />}
        rightIcon={<BsChevronDown />}
        minWidth="180px"
      >
        Add Block
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleAddBlock(BLOCK_TYPES.COMMAND)}>
          <BsTerminal />
          <Text ml={2}>Command (CLI)</Text>
        </MenuItem>
        <MenuItem onClick={() => handleAddBlock(BLOCK_TYPES.FILE)}>
          <VscListTree />
          <Text ml={2}>File Explorer</Text>
        </MenuItem>
        <MenuItem onClick={() => handleAddBlock(BLOCK_TYPES.IMAGE)}>
          <BsImage />
          <Text ml={2}>Image</Text>
        </MenuItem>
        <MenuItem onClick={() => handleAddBlock(BLOCK_TYPES.BOOKMARK)}>
          <BsBookmark />
          <Text ml={2}>Bookmark</Text>
        </MenuItem>
        <MenuItem onClick={() => handleAddBlock(BLOCK_TYPES.TODO)}>
          <BsCheckBox />
          <Text ml={2}>Todo</Text>
        </MenuItem>
        <MenuItem onClick={() => handleAddBlock(BLOCK_TYPES.NOTE)}>
          <BsFileText />
          <Text ml={2}>Note</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AddBlockMenu;
