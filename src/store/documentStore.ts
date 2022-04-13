import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { Document } from "../domain/document/Document";
import type { DocumentContentType } from "../domain/document/DocumentContentType";
import * as DocumentsApi from "../remoteApi/documentsApi";
import * as GitHubApi from "../remoteApi/gitHub/gitHubApi";
import * as reducers from "../domain/documentStoreState/documentStoreStateReducers";
import * as selectors from "../domain/documentStoreState/documentStoreStateSelectors";
import { DocumentId } from "../domain/document/DocumentId";
import { UseNavigationApi } from "../ui/shared/useNavigation";
import { fromImgurFileToImageDescriptor } from "../remoteApi/imgur/imgurApi";
import { mockedImage } from "../remoteApi/imgur/model/mockedImage";
import { getFilesFromGists, getFolderFromGists } from "../service/gitHub";
import { insertImageInEditor } from "../service/codeMirrorService";

export const storeName = "document";

//#region Slice

export const documentStore = createSlice({
  name: storeName,
  initialState: selectors.createEmptyGistState(),
  reducers
});

//#endregion
//#region Thunks

const fetchGists = createAsyncThunk(`${storeName}/fetchGists`, async (_, thunkAPI) => {
  thunkAPI.dispatch(documentStore.actions.setIsLoading(true));
  try {
    const gists = await GitHubApi.getGists();
    const folders = getFolderFromGists(gists);
    const files = await getFilesFromGists(gists);
    thunkAPI.dispatch(documentStore.actions.setFolders(folders));
    thunkAPI.dispatch(documentStore.actions.setDocuments(files));
  } catch (error) {
    throw error;
    // FIXME
  } finally {
    thunkAPI.dispatch(documentStore.actions.setIsLoading(false));
  }
});

const fetchDocuments = createAsyncThunk(`${storeName}/fetchDocuments`, async (_, thunkAPI) => {
  thunkAPI.dispatch(documentStore.actions.setIsLoading(true));
  try {
    const documents = await DocumentsApi.getDocuments();
    thunkAPI.dispatch(documentStore.actions.setDocuments(documents));
  } catch (error) {
    throw error;
    // FIXME
  } finally {
    thunkAPI.dispatch(documentStore.actions.setIsLoading(false));
  }
});

const createNewDocument = createAsyncThunk(
  `${storeName}/postDocument`,
  async ({ navigation, type }: { navigation: UseNavigationApi; type: DocumentContentType }, thunkAPI) => {
    thunkAPI.dispatch(documentStore.actions.setIsLoading(true));
    const newDocument = selectors.createNewDocument(type);
    try {
      // await DocumentsApi.postDocument(newDocument);
      thunkAPI.dispatch(documentStore.actions.addDocument(newDocument));
      navigation.navigate(`/gists/${newDocument.id}`, { replace: false });
    } catch (error) {
      throw error;
      // FIXME
    } finally {
      thunkAPI.dispatch(documentStore.actions.setIsLoading(false));
    }
  }
);

export const putDocumentThunk = createAsyncThunk(`${storeName}/putDocument`, async (document: Document, thunkAPI) => {
  await DocumentsApi.putDocument(document.id, document);
});

const deleteDocument = createAsyncThunk(
  `${storeName}/deleteDocument`,
  async ({ navigation, id }: { navigation: UseNavigationApi; id: DocumentId }, thunkAPI) => {
    thunkAPI.dispatch(documentStore.actions.setIsLoading(true));
    try {
      thunkAPI.dispatch(documentStore.actions.deleteDocument(id));
      const isActiveRoute = navigation.isActive(`/gists/${id}`);
      if (isActiveRoute) {
        navigation.navigate(`/gists/`, { replace: false });
      }
    } catch (error) {
      throw error;
      // FIXME
    } finally {
      thunkAPI.dispatch(documentStore.actions.setIsLoading(false));
    }
  }
);

const insertImage = createAsyncThunk(`${storeName}/uploadImage`, async ({documentId, file}: {documentId: DocumentId, file: File}, thunkAPI) => {
  thunkAPI.dispatch(documentStore.actions.startImageUpload(documentId));
  try {
    // const imgurFile = await uploadFile(file);
    const imgurFile = mockedImage;
    const imageDescriptor = fromImgurFileToImageDescriptor(imgurFile);
    insertImageInEditor(imageDescriptor);
  } catch (error) {
    thunkAPI.dispatch(documentStore.actions.finishImageUpload(documentId));
    throw error;
  }
});

//#endregion
//#region Export

export const documentStoreSelectors = selectors;
export const documentStoreReducer = documentStore.reducer;
export const documentStoreActions = {
  ...documentStore.actions,
  fetchGists,
  fetchDocuments,
  createNewDocument,
  deleteDocument,
  insertImage
};

//#endregion
