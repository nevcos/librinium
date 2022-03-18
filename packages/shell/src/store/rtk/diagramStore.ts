import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Diagram } from "@nevcos/shared/src/diagram/Diagram";
import * as DiagramsApi from "../../remoteApi/diagramsApi";
import { initialState } from "../domain/diagramStoreState/DiagramStoreState";
import * as reducers from "../domain/diagramStoreState/diagramStoreStateReducers";
import * as selectors from "../domain/diagramStoreState/diagramStoreStateSelectors";

const storeName = "diagram";

//#region Slice

export const diagramStore = createSlice({
  name: storeName,
  initialState,
  reducers
});

//#endregion
//#region Thunks

const fetchDiagrams = createAsyncThunk(`${storeName}/fetchDiagrams`, async (_, thunkAPI) => {
  thunkAPI.dispatch(diagramStore.actions.setIsLoading(true));
  try {
    const diagrams = await DiagramsApi.getDiagrams();
    thunkAPI.dispatch(diagramStore.actions.setDiagrams(diagrams));
  } catch (error) {
    // TBD
  } finally {
    thunkAPI.dispatch(diagramStore.actions.setIsLoading(false));
  }
});

const createNewDiagram = createAsyncThunk(`${storeName}/postDiagram`, async (_, thunkAPI) => {
  thunkAPI.dispatch(diagramStore.actions.setIsLoading(true));
  const newDiagram = selectors.createNewDiagram();
  try {
    await DiagramsApi.postDiagram(newDiagram);
    thunkAPI.dispatch(diagramStore.actions.addDiagram(newDiagram));
  } catch (error) {
    // TBD
  } finally {
    thunkAPI.dispatch(diagramStore.actions.setIsLoading(false));
  }
});

export const putDiagramThunk = createAsyncThunk(`${storeName}/putDiagram`, async (diagram: Diagram, thunkAPI) => {
  await DiagramsApi.putDiagram(diagram.id, diagram);
});

//#endregion
//#region Export

export const diagramStoreSelectors = selectors;
export const diagramStoreReducer = diagramStore.reducer;
export const diagramStoreActions = {
  ...diagramStore.actions,
  fetchDiagrams,
  createNewDiagram
};

//#endregion
