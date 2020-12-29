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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from '@chakra-ui/react';

interface Props {}

export const AddBlockMenu = (props: Props) => {
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
        <MenuItem>
          <BsTerminal />
          <Text ml={2}>Command (CLI)</Text>
        </MenuItem>
        <MenuItem>
          <VscListTree />
          <Text ml={2}>File Explorer</Text>
        </MenuItem>
        <MenuItem>
          <BsImage />
          <Text ml={2}>Image</Text>
        </MenuItem>
        <MenuItem>
          <BsBookmark />
          <Text ml={2}>Bookmark</Text>
        </MenuItem>
        <MenuItem>
          <BsCheckBox />
          <Text ml={2}>Todo</Text>
        </MenuItem>
        <MenuItem>
          <BsFileText />
          <Text ml={2}>Note</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AddBlockMenu;
