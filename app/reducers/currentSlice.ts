import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export type ActionTypes =
  | 'command'
  | 'file-explorer'
  | 'image'
  | 'bookmark'
  | 'todo'
  | 'note';

export type Block = {
  name: string;
  description: string;
  action: {
    type: ActionTypes;
    data: any;
    directory: string;
  };
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  appearance: {
    icon: {
      type: 'standard' | 'custom';
      color: string;
    };
    highlight: string;
  };
};

export type Tab = {
  name: string;
  blocks: Block[];
};

const currentSlice = createSlice({
  name: 'current',
  initialState: {
    edit: false,
    tab: 0,
    tabs: <Tab[]>[
      {
        name: 'Test',
        blocks: [],
      },
    ],
  },
  reducers: {
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
    updateTabs: (state, action) => {
      state.tabs = action.payload;
    },
    toggleEditMode: (state) => {
      state.edit = !state.edit;
    },
    addBlockToTab: (state, action) => {
      state.tabs = [
        {
          ...state.tabs[0],
          blocks: [...state.tabs[0].blocks, action.payload],
        },
        ...state.tabs.slice(0),
      ];
    },
  },
});

export const {
  changeTab,
  updateTabs,
  toggleEditMode,
  addBlockToTab,
} = currentSlice.actions;

export default currentSlice.reducer;

export const selectEditMode = (state: RootState) => state.current.edit;

export const selectCurrentTabID = (state: RootState) => state.current.tab;
export const selectCurrentTabs = (state: RootState) => state.current.tabs;
export const selectCurrentTab = (state: RootState) =>
  state.current.tabs[state.current.tab];

export const selectCurrentProjectID = (state: RootState) =>
  state.current.project;
