import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./car-slice";
import filterSlice from "./filter-slice";
import userSlice from "./user-slice";
import modalSlice from "./modal-slice";
import authSlice from "./auth-slice";

export const store = configureStore({
  reducer: {
    car: carSlice.reducer,
    filter: filterSlice.reducer,
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
