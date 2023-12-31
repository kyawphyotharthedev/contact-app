import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import { contactApi } from "./auth/contactApi";
import UserSlice from "./UserSlice";
import userSlice from "./services/userSlice";
export const store = configureStore({
  reducer: {
    userData: UserSlice,
    user: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, contactApi.middleware),
});
