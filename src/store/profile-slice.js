import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null
    },
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
    }
});

export const profileActions = profileSlice.actions;

export default profileSlice;