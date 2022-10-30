import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        playlist: null
    },
    reducers: {
        setPlaylist(state, action) {
            state.playlist = action.payload;
        },
    }
});

export const playlistActions = playlistSlice.actions;

export default playlistSlice;