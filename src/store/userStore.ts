import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "../domain/userStoreState/userStoreStateReducers";
import * as selectors from "../domain/userStoreState/userStoreStateSelectors";

export const storeName = "user";

//#region Slice

export const documentStore = createSlice({
  name: storeName,
  initialState: selectors.createEmptyState(),
  reducers: reducers
});

//#endregion
//#region Export

export const userStoreSelectors = selectors;
export const userStoreReducer = documentStore.reducer;
export const userStoreActions = {
  ...documentStore.actions
};

//#endregion
