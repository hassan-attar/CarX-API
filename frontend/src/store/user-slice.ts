import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import User from "../types/user";

const initialState: User = {
    firstName: "",
    lastName: "",
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // setUser(state, action: PayloadAction<User>) {
        //   state.name = action.payload.name;
        //   state.email = action.payload.email;
        //   state.isLoggedIn = action.payload.isLoggedIn;
        // },
        // loginUser(state, action: PayloadAction<User>) {
        //   state.name = action.payload.name;
        //   state.email = action.payload.email;
        //   state.isLoggedIn = true;
        // },
        // logoutUser(state) {
        //   state.name = "";
        //   state.email = "";
        //   state.isLoggedIn = false;
        // },
        getUser: (state, action: PayloadAction<User>) => {
            return { ...state, user: action.payload };
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;
