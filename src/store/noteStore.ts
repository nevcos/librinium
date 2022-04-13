import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { NoteContentType } from "../domain/note/NoteContentType";
import * as GitHubApi from "../remoteApi/gitHub/gitHubApi";
import * as reducers from "../domain/noteStoreState/noteStoreStateReducers";
import * as selectors from "../domain/noteStoreState/noteStoreStateSelectors";
import { NoteId } from "../domain/note/NoteId";
import { UseNavigationApi } from "../ui/shared/useNavigation";
import { fromImgurFileToImageDescriptor } from "../remoteApi/imgur/imgurApi";
import { mockedImage } from "../remoteApi/imgur/model/mockedImage";
import { getNotesFromGists, getFolderFromGists } from "../service/gitHub";
import { insertImageInEditor } from "../service/codeMirrorService";
import { FolderId } from "../domain/folder/FolderId";
import { NoteContent } from "../domain/note/NoteContent";

export const storeName = "note";

//#region Slice

export const noteStore = createSlice({
  name: storeName,
  initialState: selectors.createEmptyNoteState(),
  reducers
});

//#endregion
//#region Thunks

const fetchNotes = createAsyncThunk(`${storeName}/fetchNotes`, async (_, thunkAPI) => {
  thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
  try {
    const gists = await GitHubApi.getGists();
    const folders = getFolderFromGists(gists);
    const notes = await getNotesFromGists(gists);
    thunkAPI.dispatch(noteStore.actions.setFolders(folders));
    thunkAPI.dispatch(noteStore.actions.setNotes(notes));
  } catch (error) {
    throw error;
    // FIXME
  } finally {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
  }
});

const createNewNote = createAsyncThunk(
  `${storeName}/postNote`,
  async ({ navigation, type }: { navigation: UseNavigationApi; type: NoteContentType }, thunkAPI) => {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
    const newNote = selectors.createNewNote(type);
    try {
      thunkAPI.dispatch(noteStore.actions.addNote(newNote));
      navigation.navigate(`/note/${newNote.id}`, { replace: false });
    } catch (error) {
      throw error;
      // FIXME
    } finally {
      thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
    }
  }
);

const updateNote = createAsyncThunk(
  `${storeName}/updateNote`,
  async (
    {
      id,
      code,
      folderId
    }: {
      id: NoteId;
      code: NoteContent;
      folderId?: FolderId;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
    try {
      if (folderId) {
        thunkAPI.dispatch(noteStore.actions.updateNoteContent({ id, code }));
        GitHubApi.updateGist(folderId, id, code);
      } else {
        // TODO
      }
    } catch (error) {
      throw error;
      // FIXME
    } finally {
      thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
    }
  }
);
const deleteNote = createAsyncThunk(
  `${storeName}/deleteNote`,
  async ({ navigation, id, folderId }: { navigation: UseNavigationApi; id: NoteId; folderId?: FolderId }, thunkAPI) => {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
    try {
      if (folderId) {
        thunkAPI.dispatch(noteStore.actions.deleteNote(id));

        GitHubApi.deleteGistFile(folderId, id);

        const isActiveRoute = navigation.isActive(`/note/${id}`);
        if (isActiveRoute) {
          navigation.navigate("/note/", { replace: false });
        } else {
          // TODO
        }
      }
    } catch (error) {
      throw error;
      // FIXME
    } finally {
      thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
    }
  }
);

const deleteFolder = createAsyncThunk(
  `${storeName}/deleteFolder`,
  async ({ navigation, id }: { navigation: UseNavigationApi; id: FolderId }, thunkAPI) => {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
    try {
      thunkAPI.dispatch(noteStore.actions.deleteFolder(id));

      GitHubApi.deleteGist(id);

      // TODO: redirect could be improved
      // - we need to verify if one of the files from the folder being deleted is the active route
      navigation.navigate(`/note/`, { replace: false });
    } catch (error) {
      throw error;
      // FIXME
    } finally {
      thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
    }
  }
);

const insertImage = createAsyncThunk(
  `${storeName}/uploadImage`,
  async ({ noteId, file }: { noteId: NoteId; file: File }, thunkAPI) => {
    thunkAPI.dispatch(noteStore.actions.startImageUpload(noteId));
    try {
      // const imgurFile = await uploadFile(file);
      const imgurFile = mockedImage;
      const imageDescriptor = fromImgurFileToImageDescriptor(imgurFile);
      insertImageInEditor(imageDescriptor);
    } catch (error) {
      thunkAPI.dispatch(noteStore.actions.finishImageUpload(noteId));
      throw error;
    }
  }
);

//#endregion
//#region Export

export const noteStoreSelectors = selectors;
export const noteStoreReducer = noteStore.reducer;
export const noteStoreActions = {
  ...noteStore.actions,
  fetchNotes,
  createNewNote,
  updateNote,
  deleteNote,
  deleteFolder,
  insertImage
};

//#endregion
