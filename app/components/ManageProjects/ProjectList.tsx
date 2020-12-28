import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects } from '../../reducers/projectsSlice';

interface Props {
  currentProject: number;
  setProject: any;
}

export const ProjectList = ({ currentProject, setProject }: Props) => {
  const projects = useSelector(selectProjects);
  return (
    <Box display="flex" flexDirection="column">
      {projects.map((project, index) => {
        const isSelected = currentProject === index;
        return (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={`${project.name}_${index}`}
            fontWeight={isSelected && 'bold'}
            onClick={() => setProject(index)}
          >
            {project.name}
          </Button>
        );
      })}
    </Box>
  );
};

export default ProjectList;
