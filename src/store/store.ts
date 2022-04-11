import { configureStore } from "@reduxjs/toolkit";
import { documentStoreReducer } from "./documentStore";
import { userStoreReducer } from "./userStore";

export const store = configureStore({
  reducer: {
    gist: documentStoreReducer,
    user: userStoreReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
