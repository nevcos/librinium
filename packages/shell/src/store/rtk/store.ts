import { configureStore } from '@reduxjs/toolkit'
import diagramsReducer from './diagramStore'

export const store = configureStore({
  reducer: diagramsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

