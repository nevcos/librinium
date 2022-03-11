import create from "zustand";
import { devtools } from "zustand/middleware";

import { DiagramStoreState, initialState } from "../domain/diagramStoreState/DiagramStoreState";

export const useStore = create<DiagramStoreState>(devtools(() => initialState));

export const logAsyncAction = (actionName: string) => useStore.setState(state => state, false, actionName);
