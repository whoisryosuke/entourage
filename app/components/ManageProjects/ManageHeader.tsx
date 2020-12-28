import { Button, Box, Heading } from '@chakra-ui/react';
import { BsGear } from 'react-icons/bs';
import { BiCheckCircle } from 'react-icons/bi';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ROUTES from '../../constants/routes.json';

interface Props {}

export const ManageHeader = (props: Props) => {
  const [redirect, setRedirect] = useState(false);

  const handleDoneEditing = () => {
    setRedirect(true);
  };
  return (
    <Box
      bg="gray"
      width="100%"
      height="60px"
      display="flex"
      justifyContent="space-between"
      borderBottom="1px solid gray"
    >
      <Box display="flex" p={2}>
        <BsGear />
        <Heading>Manage Projects</Heading>
      </Box>
      <Box p={2}>
        <Button leftIcon={<BiCheckCircle />} onClick={handleDoneEditing}>
          Done Editing
        </Button>
      </Box>
      {redirect && <Redirect to={ROUTES.HOME} />}
    </Box>
  );
};

export default ManageHeader;
