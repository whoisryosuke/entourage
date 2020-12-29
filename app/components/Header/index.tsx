import { Button, Box, Select } from '@chakra-ui/react';
import { BsGear, BsPlus, BsLayoutWtf } from 'react-icons/bs';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AddBlockMenu } from '../AddBlockMenu';
import { toggleEditMode, selectEditMode } from '../../reducers/currentSlice';
import {
  changeProject,
  selectProjects,
  selectCurrentProjectID,
} from '../../reducers/projectsSlice';
import ROUTES from '../../constants/routes.json';

interface Props {}

export const Header = (props: Props) => {
  const [redirect, setRedirect] = useState(false);
  const editMode = useSelector(selectEditMode);
  const currentProject = useSelector(selectCurrentProjectID);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const handleManageProjects = () => {
    setRedirect(true);
  };

  const handleProjectSelect = ({ target }) => {
    dispatch(changeProject(target.value));
  };
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
          <Select
            minWidth="200px"
            value={currentProject}
            mr={3}
            onChange={handleProjectSelect}
          >
            {projects?.map((project, index) => (
              <option key={project.name} value={index}>
                {project.name}
              </option>
            ))}
          </Select>
          {editMode ? (
            <AddBlockMenu />
          ) : (
            <Button
              minWidth="180px"
              leftIcon={<BsGear />}
              onClick={handleManageProjects}
            >
              Manage Projects
            </Button>
          )}
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
      {redirect && <Redirect to={ROUTES.MANAGE} />}
    </Box>
  );
};

export default Header;
