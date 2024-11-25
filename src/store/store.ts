import {configureStore} from "@reduxjs/toolkit";
import slice from "./slice.ts";

const store = configureStore({reducer: {data: slice}});

// RootState tipini tanımla (store'un getState fonksiyonu ile)
export type RootState = ReturnType<typeof store.getState>;

// Dispatch tipi
export type AppDispatch = typeof store.dispatch;

export default store;
