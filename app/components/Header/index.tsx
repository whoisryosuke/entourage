import { Button, Box, Select } from '@chakra-ui/react';
import { BsGear, BsLayoutWtf } from 'react-icons/bs';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditMode, selectEditMode } from '../../reducers/currentSlice';

interface Props {}

export const Header = (props: Props) => {
  const editMode = useSelector(selectEditMode);
  const dispatch = useDispatch();
  return (
    <Box
      bg="gray"
      width="100%"
      display="flex"
      justifyContent="space-between"
      borderBottom="1px solid gray"
    >
      <Box display="flex">
        <Box display="flex" p={2}>
          <Select minWidth="200px" value="option1" mr={3}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Button minWidth="180px" leftIcon={<BsGear />}>
            Manage Projects
          </Button>
        </Box>
        <Box>{/* Other buttons */}</Box>
      </Box>
      <Box p={2}>
        <Button
          leftIcon={<BsLayoutWtf />}
          onClick={() => dispatch(toggleEditMode())}
        >
          {editMode ? 'Finish Editing' : 'Edit Layout'}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;