import React from 'react';
import { Link } from 'react-router-dom';
import storage from 'electron-json-storage';
import { Heading } from '@chakra-ui/react';
import { Header } from './Header';
import { Tabs } from './Tabs';

export default function Home(): React.ReactNode {
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
  return (
    <div data-tid="container">
      <Header />
      <Tabs />
    </div>
  );
}
