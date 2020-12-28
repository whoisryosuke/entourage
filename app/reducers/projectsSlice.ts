import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export type Project = {
  name: string;
  directory: string;
  icon: {
    type: 'standard' | 'custom';
    color: string;
  };
  tabs: string[];
};

const currentSlice = createSlice({
  name: 'projects',
  initialState: { projects: <Project[]>[], current: 0 },
  reducers: {
    changeProject: (state, action) => {
      state.current = action.payload;
    },
    addProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    removeProject: (state, action) => {
      state.projects = [
        ...state.projects.slice(0, action.payload),
        ...state.projects.slice(action.payload, state.projects.length),
      ];
    },
  },
});

export const {
  addProject,
  removeProject,
  changeProject,
} = currentSlice.actions;

export default currentSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectCurrentProjectID = (state: RootState) =>
  state.projects.current;
export const selectCurrentProject = (state: RootState) =>
  state.projects.projects[state.projects.current];
