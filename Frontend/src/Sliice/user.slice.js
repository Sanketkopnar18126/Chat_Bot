import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
   name: "userdata",
   initialState: {
      currentUser: null,
   },
   reducers: {
      signInSucess: (state, action) => {
         state.currentUser = action.payload;
      },
      signOutSucess: (state, action) => {
         state.currentUser = action.payload;
      },
   },
});

export const { signInSucess, signOutSucess } = userData.actions;
export default userData.reducer;
