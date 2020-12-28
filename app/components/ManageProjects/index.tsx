import React, { useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { ManageHeader } from './ManageHeader';
import { ProjectList } from './ProjectList';
import { Settings } from './Settings';

interface Props {}

export const ManageProjects = (props: Props) => {
  const [currentProject, setCurrentProject] = useState(0);

  const setProject = (id) => {
    setCurrentProject(id);
  };
  return (
    <Box>
      <ManageHeader />
      <Box display="flex">
        <Box id="Sidebar" display="flex" flexDirection="column">
          <ProjectList
            currentProject={currentProject}
            setProject={setProject}
          />
          <Button>Add Project</Button>
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
