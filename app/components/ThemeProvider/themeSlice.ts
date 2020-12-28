import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const counterSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light' },
  reducers: {
    toggle: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      console.log('toggling', newTheme);
      state.theme = newTheme;
    },
    light: (state) => {
      state.theme = 'light';
    },
    dark: (state) => {
      state.theme = 'dark';
    },
  },
});

export const { toggle, light, dark } = counterSlice.actions;

export default counterSlice.reducer;

export const selectTheme = (state: RootState) => state.theme.theme;
