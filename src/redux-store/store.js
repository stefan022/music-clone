import { configureStore } from "@reduxjs/toolkit";

import playerReducer from './features/playerSlice'

// shazamCore.js
import { shazamCoreApi } from "./services/shazamCore";

// redux - template code
export const store = configureStore({
    reducer: {
        [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
        player: playerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware)
})