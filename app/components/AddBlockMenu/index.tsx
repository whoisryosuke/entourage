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
  console.log('start position', startPosition);
  blocks.map(({ position }) => {
    // Find the min and max of each block
    const surfaceArea = {
      x: {
        min: position.x,
        max: position.x + position.width,
      },
      y: {
        min: position.y,
        max: position.y + position.height,
      },
    };

    // Mutate position as needed
    // Check if x fall within range of this block
    if (surfaceArea.x.min >= startPosition.x <= surfaceArea.x.max) {
      console.log('new block inside block X', surfaceArea);
      // Check if exceeds max (width = 16, height = 8)
      const blockRight = surfaceArea.x.max + position.width;
      if (blockRight + startPosition.width > 16) {
        // Check if it can be placed on other side
        const blockLeft = surfaceArea.x.min - position.width;
        if (blockLeft - startPosition.width < 0) {
          // Adjust starting y to be higher/lower -- maybe rerun this recursive?
          // Check range of current block and add/substract 1 (if min/max of canvas is reach)
        }
        startPosition = {
          ...startPosition,
          x: blockLeft,
        };
        return;
      }
      startPosition = {
        ...startPosition,
        x: blockRight,
      };
      return;
    }

    // Check if y fall within range of this block
    if (surfaceArea.y.min >= startPosition.y <= surfaceArea.y.max) {
      console.log('new block inside block Y', surfaceArea);
      // Check if exceeds max (width = 16, height = 8)
      const blockDown = surfaceArea.y.max + position.height;
      if (blockDown + startPosition.height > 16) {
        // Check if it can be placed on other side
        const blockUp = surfaceArea.y.min - position.height;
        if (blockUp - startPosition.height < 0) {
          // Adjust starting y to be higher/lower -- maybe rerun this recursive?
          // Check range of current block and add/substract 1 (if min/max of canvas is reach)
        }
        startPosition = {
          ...startPosition,
          x: blockUp,
        };
        return;
      }
      startPosition = {
        ...startPosition,
        x: blockDown,
      };
    }
  });

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
