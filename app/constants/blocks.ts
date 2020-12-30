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
  COMMAND: {
    type: BLOCK_TYPES.COMMAND,
    data: {
      commands: ['ls -la'],
      confirmation: false,
    },
    directory: '',
  },
  FILE: {
    type: BLOCK_TYPES.FILE,
    directory: '',
  },
  IMAGE: {
    type: BLOCK_TYPES.IMAGE,
    directory: '',
  },
  BOOKMARK: {
    type: BLOCK_TYPES.BOOKMARK,
    data: {
      url: 'https://google.com/',
    },
  },
  TODO: {
    type: BLOCK_TYPES.TODO,
    data: [
      {
        name: 'Test todo',
        checked: false,
      },
    ],
  },
  NOTE: {
    type: BLOCK_TYPES.NOTE,
    data: 'Hello Note World',
  },
};

export const DRAG_TYPES = {
  BLOCK: 'BLOCK',
};
