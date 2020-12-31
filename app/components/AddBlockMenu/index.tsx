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
export const checkAdjacentSlots = (freeSlots, x, y, width, height) => {
  let foundWidth = false;
  let foundHeight = false;
  let finalWidth = 0;
  let finalHeight = 0;
  const initialWidth = x + width > 16 ? x + width - 16 - width : width;
  const initialHeight = y + height > 8 ? y + height - 8 - height : height;

  // Loop through all X and Y slots
  // Reduce width and height to first filled slot
  // (cause we can't have blocks overlap gaps)
  [...Array(initialWidth)].forEach((item, xIndex) => {
    if (!foundWidth) finalWidth += 1;
    // We subtract 1 because the first row is technically checked by X
    [...Array(initialHeight - 1)].forEach((_, yIndex) => {
      if (!foundHeight) finalHeight += 1;
      if (!freeSlots[yIndex + 1 + y][xIndex + x]) {
        foundHeight = true;
        foundWidth = true;
      }
    });
  });

  return {
    width: finalWidth,
    height: finalHeight,
  };
};

export const generateSlots = (blocks) => {
  // Create arrays for all grid positions and mark all as unused for now
  const freeSlots = [...Array(8)].map((item) => [...Array(16)].fill(true));

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
        freeSlots[leftIndex][rightIndex] = false;
      }
    }
  });

  return freeSlots;
};

export const generateCoordinates = (blocks, initialPosition = {}) => {
  let startPosition = {
    x: 0,
    y: 0,
    // Override X/Y with user input
    ...initialPosition,
    width: 2,
    height: 2,
  };
  // Create arrays for all grid positions and mark all as unused for now
  const freeSlots = generateSlots(blocks);

  // Find first y and see if it works
  let found = false;
  freeSlots.forEach((row, index, currentSlots) => {
    if (!found) {
      // Go through the row and see if any item is true
      const indexFound = row.findIndex((item) => item === true);
      // If we got it, and it's within the width
      // Make it the new position
      if (!(indexFound < 0) && indexFound <= 16) {
        found = true;
        // Check adjacent slots and see if also free
        // Make width/height smaller if necessary
        const newSize = checkAdjacentSlots(
          currentSlots,
          indexFound,
          index,
          2,
          2
        );
        startPosition = {
          ...startPosition,
          x: indexFound,
          y: index,
          ...newSize,
        };
      }
    }
  });
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
