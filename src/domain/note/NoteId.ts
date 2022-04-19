import { FolderId } from "../folder/FolderId";

export type NoteId = BrandType<string, "NoteId">;

export function getNextNoteId(): NoteId {
  return String(Date.now()) as NoteId;
}

export function getNoteId(id: string, folderId: FolderId): NoteId {
  return `${folderId}_${id}` as NoteId;
}
