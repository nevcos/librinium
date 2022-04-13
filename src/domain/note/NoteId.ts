export type NoteId = BrandType<string, "NoteId">;

export function getNextNoteId(): NoteId {
  return String(Date.now()) as NoteId;
}
