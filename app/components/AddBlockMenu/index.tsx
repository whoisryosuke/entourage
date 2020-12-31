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

/**
 * Checks if item intersects with any objects in grid
 * Returns a reduced width and height if intersection
 */
const checkAdjacentSlots = (freeSlots, x, y, width, height) => {
  let foundWidth = false;
  let foundHeight = false;
  let finalWidth = 0;
  let finalHeight = 0;

  // @TODO: Check if X/Y + Width/Height exceeds grid max, reduce width/height from there

  console.log('initial w/h', x, y, finalWidth, finalHeight);

  // Loop through all X and Y slots
  // Reduce width and height to first filled slot
  // (cause we can't have blocks overlap gaps)
  [...Array(width)].forEach((item, xIndex) => {
    if (!foundWidth) finalWidth += 1;
    [...Array(height - 1)].forEach((_, yIndex) => {
      if (!foundHeight) finalHeight += 1;
      if (!freeSlots[yIndex + y][xIndex + x]) {
        foundHeight = true;
        foundWidth = true;
      }
    });
  });
  // for (let xIndex = x; xIndex <= x + (width - 1); xIndex + 1) {
  //   console.log('looping x', finalWidth);

  //   // Loop through all Y slots
  //   // for (let yIndex = y; yIndex < y + (height - 1); yIndex + 1) {
  //   //   finalHeight += 1;
  //   //   console.log('looping y', finalHeight);
  //   //   if (!foundHeight && !freeSlots[yIndex][xIndex]) {
  //   //     foundHeight = true;
  //   //     foundWidth = true;
  //   //   }
  //   // }
  //   if (foundWidth && foundHeight) break;
  // }

  console.log('final w/h', finalWidth, finalHeight);

  return {
    width: finalWidth,
    height: finalHeight,
  };
};

const generateCoordinates = (blocks) => {
  let startPosition = {
    x: 0,
    y: 0,
    width: 2,
    height: 2,
  };
  // Create arrays for all grid positions and mark all as unused for now
  const freeSlots = [...Array(8)].map((item) => [...Array(16)].fill(true));
  // const freeSlots = new Array(8).fill(new Array(16).fill(true));

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
          freeSlots,
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
  freeSlots.forEach((row, index, currentSlots) => {
    if (!found) {
      // Go through the row and see if any item is true
      const indexFound = row.findIndex((item) => item === true);
      console.log('did we find an index?', index, indexFound);
      // If we got it, and it's within the width
      // Make it the new position
      // @TODO: Check if on bottom, and make height 1
      if (!(indexFound < 0) && indexFound <= 16) {
        found = true;
        // @TODO check adjacent slots and see if also free
        const newSize = checkAdjacentSlots(
          currentSlots,
          indexFound,
          index,
          2,
          2
        );
        console.log('returning something', index, indexFound);
        startPosition = {
          ...startPosition,
          x: indexFound,
          y: index,
          ...newSize,
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
