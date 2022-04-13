import type { NoteId } from "../note/NoteId";
import { getNextNoteId } from "../note/NoteId";
import type { NoteName } from "../note/NoteName";
import type { NoteContent } from "../note/NoteContent";
import type { Note } from "../note/Note";
import type { NoteStoreState } from "./NoteStoreState";
import { NoteContentType } from "../note/NoteContentType";
import { Folder } from "../folder/Folder";
import { FolderId } from "../folder/FolderId";

export function createEmptyGistState(): NoteStoreState {
  return {
    isLoading: false,
    isUploadingImage: null,
    error: null,
    notes: {},
    folders: {}
  };
}

export function createNewNote(type: NoteContentType): Note {
  const id = getNextNoteId();
  switch (type) {
    case NoteContentType.PLANT_UML:
      return createNewPlantUml();
    case NoteContentType.REMARK:
      return createNewRemark();
    default:
      return {
        id,
        name: `New Note` as NoteName,
        code: `New->Note` as NoteContent,
        type
      };
  }
}

export function createNewPlantUml(): Note {
  const id = getNextNoteId();
  return {
    id,
    name: `New Diagram` as NoteName,
    code: `New->Diagram` as NoteContent,
    type: NoteContentType.PLANT_UML
  };
}

export function createNewRemark(): Note {
  const id = getNextNoteId();
  return {
    id,
    name: `New Presentation` as NoteName,
    code: `# Slide 1\n* Item 1\n* Item 2\n---\n# Slide 2` as NoteContent,
    type: NoteContentType.REMARK
  };
}

export function isLoading(state: NoteStoreState): boolean {
  return state.isLoading;
}

export function getNotes(state: NoteStoreState): Note[] {
  return Object.values(state.notes);
}

export function getNotesByFolder(state: NoteStoreState, folderId: FolderId): Note[] {
  const notes = getNotes(state);
  return notes.filter((note) => document.folderId === folderId);
}

export function getNotesWithoutFolder(state: NoteStoreState): Note[] {
  const notes = getNotes(state);
  return notes.filter((note) => !document.folderId);
}

export function getNote(state: NoteStoreState, noteId?: NoteId): Note | null {
  if (!noteId) return null;
  return state.notes[noteId] || null;
}

export function getFolders(state: NoteStoreState): Folder[] {
  return Object.values(state.folders);
}
