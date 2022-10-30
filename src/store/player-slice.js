import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null
    },
    reducers: {
        setPlayer(state, action) {
            state.player = action.payload;
        },
    }
});

export const playerActions = playerSlice.actions;

export default playerSlice;