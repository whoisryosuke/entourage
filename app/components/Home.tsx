import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import fs from 'fs';
import { exec } from 'child_process';
import styled from 'styled-components';
import routes from '../constants/routes.json';
import styles from './Home.css';
import storage from 'electron-json-storage';
import { toggle, light, dark } from './ThemeProvider/themeSlice';

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.text};
`;

export default function Home(): React.ReactNode {
  const dispatch = useDispatch();
  storage.set('test', {
    directory: '/Users/user/folder/',
    name: 'Alpha Project',
    icon: {
      type: 'standard',
      color: '#F0F0F0',
    },
    blocks: [
      // Command Line Block
      {
        name: 'Start Server',
        description: 'Starts the development server on port 8080',
        action: {
          type: 'command',
          data: ['npm run dev', 'npm run lint'],
          directory: '',
          confirmation: false,
        },
        appearance: {
          icon: {
            type: 'standard',
            color: '#F0F0F0',
          },
          highlight: '#F0F0F0',
        },
      },

      // File Explorer
      {
        name: 'Project folder',
        description: 'The primary folder',
        action: {
          type: 'file-explorer',
          directory: '/projects/project-1/',
        },
        appearance: {
          icon: {
            type: 'standard',
            color: '#F0F0F0',
          },
          highlight: '#F0F0F0',
        },
      },

      // File Explorer
      {
        name: 'Project folder',
        description: 'The primary folder',
        action: {
          type: 'file-explorer',
          directory: '/projects/project-1/',
        },
        appearance: {
          icon: {
            type: 'standard',
            color: '#F0F0F0',
          },
          highlight: '#F0F0F0',
        },
      },
    ],
  });

  storage.get('test', function (error, data) {
    if (error) throw error;

    console.log('json data', data);
  });
  // exec('ls -la', (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(`error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });
  return (
    <div className={styles.container} data-tid="container">
      <Header>Home</Header>
      <button onClick={() => dispatch(toggle())}>Toggle</button>
      <button onClick={() => dispatch(light())}>Light</button>
      <button onClick={() => dispatch(dark())}>Dark</button>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
