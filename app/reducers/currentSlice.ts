import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const currentSlice = createSlice({
  name: 'current',
  initialState: { edit: false, tab: 0, tabs: [] },
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
  },
});

export const { changeTab, updateTabs, toggleEditMode } = currentSlice.actions;

export default currentSlice.reducer;

export const selectEditMode = (state: RootState) => state.current.edit;

export const selectCurrentTabID = (state: RootState) => state.current.tab;
export const selectCurrentTabs = (state: RootState) => state.current.tabs;
export const selectCurrentTab = (state: RootState) =>
  state.current.tabs[state.current.tab];

export const selectCurrentProjectID = (state: RootState) =>
  state.current.project;