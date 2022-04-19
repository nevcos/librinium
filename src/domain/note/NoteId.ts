import { FolderId } from "../folder/FolderId";
import { NoteName } from "./NoteName";

export type NoteId = BrandType<string, "NoteId">;

export function getNextNoteId(): NoteId {
  return String(Date.now()) as NoteId;
}

export function getNoteId(folderId: FolderId, name: NoteName): NoteId {
  return `${folderId}_${name}` as NoteId;
}

export function getNoteNameFromNoteId(id: NoteId): NoteName {
  return id.split("_")[1] as NoteName;
}
