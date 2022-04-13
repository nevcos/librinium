import { configureStore } from "@reduxjs/toolkit";
import {noteStore, noteStoreReducer} from "./noteStore";
import { userStoreReducer } from "./userStore";

export const store = configureStore({
  reducer: {
    note: noteStoreReducer,
    user: userStoreReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
