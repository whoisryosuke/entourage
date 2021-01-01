/* eslint-disable import/prefer-default-export */
export const BLOCK_TYPES = {
  COMMAND: 'command',
  FILE: 'file-explorer',
  IMAGE: 'image',
  BOOKMARK: 'bookmark',
  TODO: 'todo',
  NOTE: 'note',
};

export const BLOCK_SAMPLES = {
  command: {
    type: BLOCK_TYPES.COMMAND,
    data: {
      commands: ['ls -la'],
      confirmation: false,
    },
    directory: '',
  },
  file: {
    type: BLOCK_TYPES.FILE,
    directory: '',
  },
  image: {
    type: BLOCK_TYPES.IMAGE,
    directory: '',
  },
  bookmark: {
    type: BLOCK_TYPES.BOOKMARK,
    data: {
      name: 'Google',
      url: 'https://google.com/',
    },
  },
  todo: {
    type: BLOCK_TYPES.TODO,
    data: [
      {
        name: 'Test todo',
        checked: false,
      },
    ],
  },
  note: {
    type: BLOCK_TYPES.NOTE,
    data: 'Hello Note World',
  },
};

export const DRAG_TYPES = {
  BLOCK: 'BLOCK',
};
