import type { ContentTypeName } from "../../contentType/domain/ContentTypeName";
import type { NoteId } from "../note/NoteId";
import type { Note } from "../note/Note";
import type { NoteName } from "../note/NoteName";
import { getNextNoteId } from "../note/NoteId";
import type { NoteContent } from "../note/NoteContent";
import type { NoteStoreState } from "./NoteStoreState";
import type { Folder } from "../folder/Folder";
import type { FolderId } from "../folder/FolderId";
import { getContentTypePluginByName } from "../../contentType/ContentTypeService";
import { FilesNode } from "./FilesNode";
import { FolderName } from "../folder/FolderName";

export function createEmptyNoteState(): NoteStoreState {
  return {
    isLoading: false,
    isUploadingImage: null,
    error: null,
    notes: {},
    folders: {}
  };
}

export function createEmptyNote(type: ContentTypeName = "Text" as ContentTypeName): Note {
  const contentTypePlugin = getContentTypePluginByName(type);
  const id = getNextNoteId();
  const name = `New ${contentTypePlugin?.name || type}` as NoteName;
  const code = (contentTypePlugin?.emptyTemplate?.() || "") as NoteContent;
  return { id, name, code, type };
}

export function isLoading(state: NoteStoreState): boolean {
  return state.isLoading;
}

export function getNotes(state: NoteStoreState): Note[] {
  return Object.values(state.notes);
}

export function getNotesByFolder(state: NoteStoreState, folderId: FolderId): Note[] {
  const notes = getNotes(state);
  return notes.filter((note) => note.folderId === folderId);
}

export function getNotesWithoutFolder(state: NoteStoreState): Note[] {
  const notes = getNotes(state);
  return notes.filter((note) => !note.folderId);
}

export function getNote(state: NoteStoreState, noteId?: NoteId): Note | null {
  if (!noteId) return null;
  return state.notes[noteId] || null;
}

export function getFolders(state: NoteStoreState): Folder[] {
  return Object.values(state.folders);
}

export function getFilesTree(state: NoteStoreState, filter?: string): FilesNode {
  const tree: FilesNode = {
    value: { id: "/" as FolderId, name: "/" as FolderName },
    children: [
      ...getFolders(state).map((folder) => ({
        value: folder,
        children: getNotesByFolder(state, folder.id).map((note) => ({ value: note, children: [] }))
      })),
      ...getNotesWithoutFolder(state).map((note) => ({ value: note, children: [] }))
    ]
  };

  if (filter) filterTree(tree, filter);

  return tree;
}

function filterTree(tree: FilesNode, filter: string): boolean {
  filter = normalizeTextForSearch(filter);

  // Test node children
  if (tree.children.length) {
    tree.children = tree.children.filter((tree) => filterTree(tree, filter));
    if (tree.children.length) return true;
  }

  // Otherwise test node value
  return normalizeTextForSearch(tree.value.name).includes(filter);
}

function normalizeTextForSearch(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
