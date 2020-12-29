import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export type Project = {
  name: string;
  directory: string;
  icon: {
    type: 'standard' | 'custom';
    color: string;
    name: string;
  };
  tabs: string[];
};

type UpdateProject = {
  id: number;
  project: Project;
};

const currentSlice = createSlice({
  name: 'projects',
  initialState: { projects: <Project[]>[], current: 0 },
  reducers: {
    changeProject: (state, action: number) => {
      state.current = action.payload;
    },
    addProject: (state, action: Project) => {
      state.projects = [...state.projects, action.payload];
    },
    updateProject: (state, action: UpdateProject) => {
      const projects = [...state.projects];
      const newProject = {
        ...state.projects[action.payload.id],
        ...action.payload.project,
      };
      projects[action.payload.id] = newProject;

      state.projects = [...projects];
    },
    removeProject: (state, action: number) => {
      state.projects = [
        ...state.projects.slice(0, action.payload),
        ...state.projects.slice(action.payload + 1),
      ];
    },
  },
});

export const {
  addProject,
  removeProject,
  changeProject,
  updateProject,
} = currentSlice.actions;

export default currentSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectCurrentProjectID = (state: RootState) =>
  state.projects.current;
export const selectCurrentProject = (state: RootState) =>
  state.projects.projects[state.projects.current];
