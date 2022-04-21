import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as GitHubApi from "../remoteApi/gitHub/gitHubApi";
import * as reducers from "../domain/userStoreState/userStoreStateReducers";
import * as selectors from "../domain/userStoreState/userStoreStateSelectors";
import { UserStoreStatePatch } from "../domain/userStoreState/UserStoreStatePatch";

export const storeName = "user";

//#region Slice

export const noteStore = createSlice({
  name: storeName,
  initialState: selectors.createEmptyState(),
  reducers: reducers
});

//#endregion
//#region Thunks

const fetchUser = createAsyncThunk(`${storeName}/fetchUser`, async (_, thunkAPI) => {
  try {
    const user = await GitHubApi.getUser();
    const patch: UserStoreStatePatch = {
      name: user.name,
      username: user.login,
      url: user.html_url,
      avatar: user.avatar_url
    };

    thunkAPI.dispatch(noteStore.actions.patch(patch));
  } catch (error) {
    throw error;
  }
});

//#endregion
//#region Export

export const userStoreSelectors = selectors;
export const userStoreReducer = noteStore.reducer;
export const userStoreActions = {
  ...noteStore.actions,
  fetchUser
};

//#endregion
