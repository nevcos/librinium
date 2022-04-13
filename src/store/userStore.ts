import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "../domain/userStoreState/userStoreStateReducers";
import * as selectors from "../domain/userStoreState/userStoreStateSelectors";

export const storeName = "user";

//#region Slice

export const noteStore = createSlice({
  name: storeName,
  initialState: selectors.createEmptyState(),
  reducers: reducers
});

//#endregion
//#region Export

export const userStoreSelectors = selectors;
export const userStoreReducer = noteStore.reducer;
export const userStoreActions = {
  ...noteStore.actions
};

//#endregion
