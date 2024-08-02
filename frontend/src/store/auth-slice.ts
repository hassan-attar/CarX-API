import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Auth = { token: string | null };

const initialState: Auth = { token: null };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;
