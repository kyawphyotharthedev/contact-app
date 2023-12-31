import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: [],
  lastPage: 0,
};
export const UserSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addUser: (state, actions) => {
      state.userData = actions?.payload;
    },
    pageLength: (state, actions) => {
      state.lastPage = actions?.payload;
    },
  },
});
export const { addUser,pageLength } = UserSlice.actions;
export default UserSlice.reducer;
