import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
import { NoteName } from "../domain/note/NoteName";
import { Note } from "../domain/note/Note";
import { getFileTypeFromExtension } from "../domain/note/util";
import { FolderName } from "../domain/folder/FolderName";
import { NoteMap } from "../domain/note/NoteMap";

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
    thunkAPI.dispatch(noteStore.actions.addFolders(folders));
    thunkAPI.dispatch(noteStore.actions.addNotes(notes));
  } catch (error) {
    throw error;
    // FIXME
  } finally {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
  }
});

const createNote = createAsyncThunk(
  `${storeName}/createNote`,
  async (
    { navigation, filename, folderId }: { navigation: UseNavigationApi; filename: NoteName; folderId: FolderId },
    thunkAPI
  ) => {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(true));

    const newNoteId = filename as unknown as NoteId;
    const newNote: Note = {
      id: newNoteId,
      name: filename,
      type: getFileTypeFromExtension(filename),
      code: "# hello from librinium" as NoteContent, // new Gist files are required to have content
      folderId
    };
    const newNoteMap: NoteMap = { [newNoteId]: newNote };

    try {
      thunkAPI.dispatch(noteStore.actions.addNotes(newNoteMap));

      if (newNote.folderId) {
        GitHubApi.updateGist(newNote.folderId, newNote.name, newNote.code);
      } else {
        // TODO
      }

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

const createFolder = createAsyncThunk(`${storeName}/createFolder`, async ({ name }: { name: FolderName }, thunkAPI) => {
  thunkAPI.dispatch(noteStore.actions.setIsLoading(true));

  try {
    const gist = [await GitHubApi.createGist(name)];
    const folders = getFolderFromGists(gist);
    const notes = await getNotesFromGists(gist);
    thunkAPI.dispatch(noteStore.actions.addFolders(folders));
    thunkAPI.dispatch(noteStore.actions.addNotes(notes));
  } catch (error) {
    throw error;
    // FIXME
  } finally {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
  }
});

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
  createNote,
  updateNote,
  createFolder,
  deleteNote,
  deleteFolder,
  insertImage
};

//#endregion
