import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { Note } from "../domain/note/Note";
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

export const putNoteThunk = createAsyncThunk(`${storeName}/putNote`, async (note: Note, thunkAPI) => {
  // TODO
});

const deleteNote = createAsyncThunk(
  `${storeName}/deleteNote`,
  async (
    { navigation, noteId, folderId }: { navigation: UseNavigationApi; noteId: NoteId; folderId?: FolderId },
    thunkAPI
  ) => {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
    try {
      if (folderId) {
        thunkAPI.dispatch(noteStore.actions.deleteNote(noteId));

        GitHubApi.deleteGistFile(folderId, noteId);
        const isActiveRoute = navigation.isActive(`/note/${noteId}`);
        if (isActiveRoute) {
          navigation.navigate("/note/", { replace: false });
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
  deleteNote,
  deleteFolder,
  insertImage
};

//#endregion
