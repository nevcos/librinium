import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as GitHubApi from "../remoteApi/gitHub/gitHubApi";
import * as reducers from "../domain/noteStoreState/noteStoreStateReducers";
import * as selectors from "../domain/noteStoreState/noteStoreStateSelectors";
import { getNoteId, getNoteNameFromNoteId, NoteId } from "../domain/note/NoteId";
import { UseNavigationApi } from "../ui/shared/useNavigation";
import { fromImgurFileToImageDescriptor } from "../remoteApi/imgur/imgurApi";
import { mockedImage } from "../remoteApi/imgur/model/mockedImage";
import { getNotesFromGists, getFolderFromGists } from "../service/gitHub";
import { insertImageInEditor } from "../service/codeMirrorService";
import { FolderId } from "../domain/folder/FolderId";
import { NoteContent } from "../domain/note/NoteContent";
import { NoteName } from "../domain/note/NoteName";
import { Note } from "../domain/note/Note";
import { FolderName } from "../domain/folder/FolderName";
import { NotePatch } from "../domain/note/NotePatch";
import { GistFile } from "../remoteApi/gitHub/GistFile";
import { determineContentTypeName } from "../contentType/ContentTypeService";
import { GistPatch } from "../remoteApi/gitHub/GistPatch";

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

    const newNote: Note = {
      id: getNoteId(folderId, filename),
      name: filename,
      type: determineContentTypeName(filename),
      code: "# hello from librinium" as NoteContent, // new Gist files are required to have content
      folderId
    };

    try {
      thunkAPI.dispatch(noteStore.actions.addNotes({ [newNote.id]: newNote }));

      if (newNote.folderId) {
        // treating the new note as a patch here because it's actually a patch from a Gists point of view
        GitHubApi.updateGist(newNote.folderId, convertNotePatchToGistPatch(newNote));
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

const updateNote = createAsyncThunk(`${storeName}/updateNote`, async ({ patch }: { patch: NotePatch }, thunkAPI) => {
  debugger;
  thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
  try {
    if (patch.folderId) {
      console.info("Updating note", { patch });
      thunkAPI.dispatch(noteStore.actions.updateNote(patch));
      GitHubApi.updateGist(patch.folderId, convertNotePatchToGistPatch(patch));
    } else {
      // TODO
    }
  } catch (error) {
    throw error;
    // FIXME
  } finally {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(false));
  }
});

const updateNoteName = createAsyncThunk(
  `${storeName}/updateNoteName`,
  async ({ patch }: { patch: NotePatch }, thunkAPI) => {
    thunkAPI.dispatch(noteStore.actions.setIsLoading(true));
    try {
      thunkAPI.dispatch(noteStore.actions.updateNote(patch));

      if (patch.folderId) {
        GitHubApi.updateGist(patch.folderId, convertNotePatchToGistPatch(patch));
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

        GitHubApi.deleteGistFile(folderId, getNoteNameFromNoteId(id));

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
  updateNoteName,
  createFolder,
  deleteNote,
  deleteFolder,
  insertImage
};

//#endregion
//#region Utils

function convertNotePatchToGistPatch(patch: NotePatch): GistPatch {
  const id = getNoteNameFromNoteId(patch.id);
  const file: Partial<GistFile> = {};

  if (patch.name) file.filename = patch.name;
  if (patch.code) file.content = patch.code;

  const payload: GistPatch = { files: { [id]: file } };

  return payload;
}

//#endregion
