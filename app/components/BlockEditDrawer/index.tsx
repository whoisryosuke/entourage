import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from '@chakra-ui/react';
import { Block, updateBlockAction } from '../../reducers/currentSlice';

interface Props {
  isOpen: any;
  onClose: any;
  selectedBlock: Block;
  editBlockId: number;
}

const ControlInput = ({ label, defaultValue, editBlockId, section }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(
      updateBlockAction({
        id: editBlockId,
        label,
        data: event.target.value,
        section,
      })
    );
  };
  const handleArray = (event) =>
    setValue((prevValue) => {
      const newArray = [...prevValue];

      const newItem = [...(newArray[event.target.name] = event.target.value)];

      newArray[event.target.name] = newItem;

      return newArray;
    });

  useEffect(() => {
    setValue(defaultValue);
  }, [setValue, defaultValue]);

  let input;
  switch (typeof defaultValue) {
    case 'boolean':
      input = <Switch value={value} onChange={handleChange} />;
      break;
    case 'object':
      input = defaultValue.map((nestedInput, index) => (
        <Input
          key={nestedInput}
          type="text"
          name={index}
          value={nestedInput}
          onChange={handleArray}
        />
      ));
      break;
    case 'string':
    default:
      input = <Input type="text" value={value} onChange={handleChange} />;
      break;
  }

  return (
    <FormControl key={label} id={label}>
      <FormLabel>{label}</FormLabel>
      {input}
    </FormControl>
  );
};

export const BlockEditDrawer = ({
  isOpen,
  onClose,
  selectedBlock,
  editBlockId,
}: Props) => {
  const createInput = (key, value, section) => {
    // if (typeof value === 'array' || typeof value === 'object') {
    //   return value.map((nestedItem) => createInput(key, nestedItem));
    // }
    return (
      <ControlInput
        label={key}
        defaultValue={value}
        editBlockId={editBlockId}
        section={section}
      />
    );
  };
  const inputs = Object.keys(selectedBlock.action.data).map((key) =>
    createInput(key, selectedBlock.action.data[key], 'action')
  );
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      // finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>{inputs}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default BlockEditDrawer;
