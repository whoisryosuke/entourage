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
import { useDispatch } from 'react-redux';
import { addBlockToTab } from '../../reducers/currentSlice';
import { BLOCK_TYPES, BLOCK_SAMPLES } from '../../constants/blocks';

interface Props {}

export const AddBlockMenu = (props: Props) => {
  const dispatch = useDispatch();

  const handleAddBlock = (blockType) => {
    dispatch(
      addBlockToTab({
        name: 'Execute Command',
        description: 'A sample command',
        action: BLOCK_SAMPLES[blockType],
        position: {
          x: 0,
          y: 0,
          width: 2,
          height: 2,
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
