import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    name: 'album',
    initialState: {
        album: null
    },
    reducers: {
        setAlbum(state, action) {
            state.album = action.payload;
        },
    }
});

export const albumActions = albumSlice.actions;

export default albumSlice;