import { Note } from "./Note";
import { NoteId } from "./NoteId";

export type NotePatch = Partial<Note> & { id: NoteId };
