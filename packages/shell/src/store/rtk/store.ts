import { configureStore } from "@reduxjs/toolkit";
import { documentStoreReducer } from "./documentStore";

export const store = configureStore({
  reducer: documentStoreReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
