import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
   
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
        };
        let isNotification = state.notification;
        if(isNotification === !null){
          setTimeout(()=>{isNotification = null},10000);
        }
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
