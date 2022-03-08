import { configureStore } from '@reduxjs/toolkit'
import { diagramStoreReducer } from './diagramStore'

export const store = configureStore({
  reducer: diagramStoreReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

