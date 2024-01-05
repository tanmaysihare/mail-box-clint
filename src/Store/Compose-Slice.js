import { createSlice } from '@reduxjs/toolkit';

const composeSlice = createSlice({
  name: 'compose',
  initialState: {
    to: '',
    subject: '',
    content: '',
  },
  reducers: {
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  
    resetCompose: (state) => {
      state.to = '';
      state.subject = '';
      state.content = '';
    },
  },
});

export const composeAction = composeSlice.actions;
export default composeSlice.reducer;
