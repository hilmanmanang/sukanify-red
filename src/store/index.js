import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./album-slice";
import authSlice from "./auth-slice";
import playerSlice from "./player-slice";
import playlistSlice from "./playlist-slice";
import profileSlice from "./profile-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        profile: profileSlice.reducer,
        playlist: playlistSlice.reducer,
        player: playerSlice.reducer,
        album: albumSlice.reducer,
    }
});

export default store;