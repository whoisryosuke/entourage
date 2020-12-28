import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Heading } from '@chakra-ui/react';
import { ManageHeader } from './ManageHeader';
import { ProjectList } from './ProjectList';
import { Settings } from './Settings';
import { addProject } from '../../reducers/projectsSlice';

interface Props {}

export const ManageProjects = (props: Props) => {
  const [currentProject, setCurrentProject] = useState(0);
  const dispatch = useDispatch();

  const setProject = (id) => {
    setCurrentProject(id);
  };

  // Creates placeholder project
  const createProject = () => {
    dispatch(
      addProject({
        name: 'Your Project',
        directory: '',
        icon: {
          type: 'standard',
          color: '#F0F0F0',
        },
        tabs: ['First Tab'],
      })
    );
  };

  return (
    <Box>
      <ManageHeader />
      <Box display="flex" overflow="scroll" height="calc(100vh - 60px)">
        <Box
          id="Sidebar"
          display="flex"
          flexDirection="column"
          position="sticky"
          top="0"
        >
          <ProjectList
            currentProject={currentProject}
            setProject={setProject}
          />
          <Button onClick={createProject}>Add Project</Button>
          <Button>Duplicate Project</Button>
          <Button>Import Project</Button>
        </Box>
        <Box id="Settings">
          <Settings currentProject={currentProject} />
        </Box>
      </Box>
    </Box>
  );
};

export default ManageProjects;
