import React, { useEffect } from 'react';
import { Box, Input, Stack, Select, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects } from '../../reducers/projectsSlice';

interface Props {
  currentProject: number;
}

export const Settings = ({ currentProject }: Props) => {
  const [formData, setFormData] = React.useState({});
  const handleChange = (event) =>
    setFormData((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  const projects = useSelector(selectProjects);
  const project = projects[currentProject];

  useEffect(() => {
    // Sync form data with Redux
    if (project)
      setFormData({
        name: project.name,
        directory: project.directory,
        directory: project.directory,
        iconType: project.icon.type,
        iconColor: project.icon.color,
        iconName: project.icon.name,
      });
  }, [project]);

  return (
    <Box display="flex" flexDirection="column" p={8}>
      {project && (
        <>
          <Stack spacing={0} mb={7}>
            <Text mb={2}>Project Name:</Text>
            <Text size="xs" opacity="50%" mb={2}>
              Name of project displayed in project list.
            </Text>
            <Input
              name="name"
              placeholder={project.name}
              value={formData?.name}
              onChange={handleChange}
            />
          </Stack>
          <Stack spacing={0} mb={7}>
            <Text mb={2}>Project Directory:</Text>
            <Text size="xs" opacity="50%" mb={2}>
              Directory where project files are stored.
            </Text>
            <Input
              name="directory"
              placeholder={project.directory}
              value={formData?.directory}
              onChange={handleChange}
            />
          </Stack>
          <Stack spacing={0} mb={7}>
            <Text mb={2}>Icon Type:</Text>
            <Text size="xs" opacity="50%" mb={2}>
              The type of icon
            </Text>
            <Select
              name="iconType"
              value={formData?.iconType}
              onChange={handleChange}
            >
              <option value="standard">Standard</option>
              <option value="custom">Custom</option>
            </Select>
          </Stack>
          {project.icon.type === 'custom' && (
            <Stack spacing={0} mb={7}>
              <Text mb={2}>Icon Name:</Text>
              <Text size="xs" opacity="50%" mb={2}>
                The type of icon
              </Text>
              <Input
                name="iconName"
                placeholder={project.icon.name}
                value={formData?.iconName}
                onChange={handleChange}
              />
            </Stack>
          )}
          {project.icon.type === 'standard' && (
            <Stack spacing={0} mb={7}>
              <Text mb={2}>Icon Name:</Text>
              <Text size="xs" opacity="50%" mb={2}>
                The type of icon
              </Text>
              <Select
                name="iconName"
                value={formData?.iconName}
                onChange={handleChange}
              >
                <option value="standard">Standard</option>
                <option value="custom">Custom</option>
              </Select>
            </Stack>
          )}
          {project.icon.type === 'standard' && (
            <Stack spacing={0} mb={7}>
              <Text mb={2}>Icon Color:</Text>
              <Text size="xs" opacity="50%" mb={2}>
                The icon displayed next to project
              </Text>
              <Input
                name="iconColor"
                placeholder={project.icon.color}
                value={formData?.iconColor}
                onChange={handleChange}
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default Settings;
