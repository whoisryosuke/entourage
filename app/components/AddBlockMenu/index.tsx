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
  const freeSlots = new Array(8).fill(freeXSlots);

  console.log('blocks', blocks);
  console.log('start position', startPosition);
  console.log('free positions', freeSlots);
  // Loop through blocks and mark grid positions as used
  blocks.map(({ position }) => {
    // We loop through the min and max X values
    // And inside that, do same for Y
    // To get X,Y (or Y,X in this case) and mark slot as "used" in array
    for (
      let rightIndex = position.x;
      rightIndex <= position.x + position.width - 1;
      rightIndex++
    ) {
      for (
        let leftIndex = position.y;
        leftIndex <= position.y + position.height - 1;
        leftIndex++
      ) {
        console.log(
          'position taken',
          position,
          freeSlots[leftIndex],
          rightIndex,
          leftIndex
        );
        freeSlots[leftIndex][rightIndex] = false;
      }
    }
  });

  // Find first x and see if it works
  // const firstX = freeXSlots.findIndex((item) => item === true);
  // console.log(
  //   'first x index',
  //   firstX !== null && firstX + startPosition.width <= 16
  // );
  // if (firstX !== null && firstX + startPosition.width <= 16) {
  //   startPosition = {
  //     ...startPosition,
  //     x: firstX,
  //   };
  // } else {
  //   throw new Error('No free slots horizontally');
  // }

  // Find first y and see if it works
  let found = false;
  freeSlots.forEach((row, index) => {
    if (!found) {
      // Go through the row and see if any item is true
      const indexFound = row.findIndex((item) => item === true);
      console.log('did we find an index?', index, indexFound);
      // If we got it, and it's within the width
      // Make it the new position
      // @TODO: Check if on bottom, and make height 1
      if (!(indexFound <= 0) && indexFound <= 16) {
        found = true;
        console.log('returning something', index, indexFound);
        startPosition = {
          ...startPosition,
          x: indexFound,
          y: index,
        };
      }
    }
  });
  console.log('free slots', freeSlots, startPosition);
  // if (firstY !== null && firstY + startPosition.height <= 8) {
  //   startPosition = {
  //     ...startPosition,
  //     y: firstY,
  //   };
  // } else {
  //   throw new Error('No free slots vertically');
  // }

  // console.log('updated free positions', freeXSlots, freeYSlots);
  // console.log('new position', startPosition);
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
