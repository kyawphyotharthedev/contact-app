import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      Cookies.set("user", JSON.stringify(state.user));
      Cookies.set("token", state.token);
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
