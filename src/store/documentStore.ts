import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { Document } from "../domain/document/Document";
import type { DocumentContentType } from "../domain/document/DocumentContentType";
import * as DocumentsApi from "../remoteApi/documentsApi";
import { initialState } from "../domain/documentStoreState/DocumentStoreState";
import * as reducers from "../domain/documentStoreState/documentStoreStateReducers";
import * as selectors from "../domain/documentStoreState/documentStoreStateSelectors";

export const storeName = "document";

//#region Slice

export const documentStore = createSlice({
  name: storeName,
  initialState: initialState,
  reducers: reducers
});

//#endregion
//#region Thunks

const fetchDocuments = createAsyncThunk(`${storeName}/fetchDocuments`, async (_, thunkAPI) => {
  thunkAPI.dispatch(documentStore.actions.setIsLoading(true));
  try {
    const documents = await DocumentsApi.getDocuments();
    thunkAPI.dispatch(documentStore.actions.setDocuments(documents));
  } catch (error) {
    // TBD
  } finally {
    thunkAPI.dispatch(documentStore.actions.setIsLoading(false));
  }
});

const createNewDocument = createAsyncThunk(`${storeName}/postDocument`, async (type: DocumentContentType, thunkAPI) => {
  thunkAPI.dispatch(documentStore.actions.setIsLoading(true));
  const newDocument = selectors.createNewDocument(type);
  try {
    // await DocumentsApi.postDocument(newDocument);
    thunkAPI.dispatch(documentStore.actions.addDocument(newDocument));
  } catch (error) {
    // TBD
  } finally {
    thunkAPI.dispatch(documentStore.actions.setIsLoading(false));
  }
});

export const putDocumentThunk = createAsyncThunk(`${storeName}/putDocument`, async (document: Document, thunkAPI) => {
  await DocumentsApi.putDocument(document.id, document);
});

//#endregion
//#region Export

export const documentStoreSelectors = selectors;
export const documentStoreReducer = documentStore.reducer;
export const documentStoreActions = {
  ...documentStore.actions,
  fetchDocuments,
  createNewDocument
};

//#endregion
