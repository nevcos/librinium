import type { NoteMap } from "../note/NoteMap";
import type { NoteName } from "../note/NoteName";
import type { Note } from "../note/Note";
import type { NoteId } from "../note/NoteId";
import type { NoteContent } from "../note/NoteContent";
import type { NoteStoreState } from "./NoteStoreState";
import { getNote } from "./noteStoreStateSelectors";
import { FolderMap } from "../folder/FolderMap";
import { FolderId } from "../folder/FolderId";
import { Folder } from "../folder/Folder";

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

export function updateNoteContent(state: NoteStoreState, action: Payload<{ id: NoteId; code: NoteContent }>): void {
  const { id, code } = action.payload;
  const note = getNote(state, id);
  if (note && note.code !== code) {
    note.code = code;
  }
}

export function deleteNote(state: NoteStoreState, action: Payload<NoteId>): void {
  const id = action.payload;
  delete state.notes[id];
}

export function updateNoteName(state: NoteStoreState, action: Payload<{ id: NoteId; name: NoteName }>): void {
  const { id, name } = action.payload;
  const note = getNote(state, id);
  if (!note) throw new Error("Note not found");
  note.name = name;
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
