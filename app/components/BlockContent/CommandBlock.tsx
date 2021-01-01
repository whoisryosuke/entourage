import React from 'react';
import { exec } from 'child_process';
import { Block } from '../../reducers/currentSlice';

interface Props {
  name: string;
  action: Block['action'];
}

export const CommandBlock = ({ name, action }: Props) => {
  const runCommand = () => {
    action.data?.commands.forEach((command: string) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    });
  };
  return (
    <button type="button" onClick={runCommand} title="Run command">
      {name || 'Run Command'}
    </button>
  );
};

export default CommandBlock;
