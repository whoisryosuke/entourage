import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Text } from '@chakra-ui/react';
import { CurrentTab } from '../CurrentTab';
import { selectCurrentProject } from '../../reducers/projectsSlice';
import { changeTab } from '../../reducers/currentSlice';

interface Props {}

export const Tabs = (props: Props) => {
  // const { tabs } = useSelector(selectCurrentProject);
  const dispatch = useDispatch();
  const tabs = ['Primary'];
  return (
    <Box>
      {/* Tabs */}
      <Box>
        {tabs?.map((tab, index) => (
          <Button key={index} onClick={() => dispatch(changeTab(index))}>
            <Text>{tab}</Text>
          </Button>
        ))}
      </Box>
      <Box>
        <CurrentTab />
      </Box>
    </Box>
  );
};

export default Tabs;
