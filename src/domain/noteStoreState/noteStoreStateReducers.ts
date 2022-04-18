import type { NoteMap } from "../note/NoteMap";
import type { Note } from "../note/Note";
import type { NoteId } from "../note/NoteId";
import type { NoteStoreState } from "./NoteStoreState";
import { getNote } from "./noteStoreStateSelectors";
import { FolderMap } from "../folder/FolderMap";
import { FolderId } from "../folder/FolderId";
import { Folder } from "../folder/Folder";
import { NotePatch } from "../note/NotePatch";

interface Payload<T> {
  payload: T;
}

// endregion
// region common

export function setIsLoading(state: NoteStoreState, action: Payload<boolean>): void {
  state.isLoading = action.payload;
}

// region Folders

export function addFolders(state: NoteStoreState, action: Payload<FolderMap>): void {
  const folders = action.payload;
  let key: FolderId;
  for (key in folders) {
    const folder = folders[key] as Folder;
    state.folders[key] = folder;
  }
}

export function deleteFolder(state: NoteStoreState, action: Payload<FolderId>): void {
  const id = action.payload;

  // delete folder
  delete state.folders[id];

  // delete folder files
  let key: NoteId;
  for (key in state.notes) {
    const file = state.notes[key];
    if (file.folderId === id) {
      delete state.notes[key];
    }
  }
}

// endregion
// region Notes

export function addNotes(state: NoteStoreState, action: Payload<NoteMap>): void {
  const notes = action.payload;
  let key: NoteId;
  for (key in notes) {
    const note = notes[key] as Note;
    state.notes[key] = note;
  }
}

export function updateNote(state: NoteStoreState, action: Payload<NotePatch>): void {
  const patch = action.payload;
  const updatedNote = { ...getNote(state, patch.id), ...patch } as Note;
  state.notes[patch.id] = updatedNote;
}

export function deleteNote(state: NoteStoreState, action: Payload<NoteId>): void {
  const id = action.payload;
  delete state.notes[id];
}

// endregion
// region image

export function startImageUpload(state: NoteStoreState, action: Payload<NoteId>): void {
  state.isUploadingImage = action.payload;
}

export function finishImageUpload(state: NoteStoreState, action: Payload<NoteId>): void {
  state.isUploadingImage = null;
}

// endregion
