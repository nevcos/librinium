import type { NoteId } from "./NoteId";
import type { NoteName } from "./NoteName";
import type { NoteContent } from "./NoteContent";
import { NoteContentType } from "./NoteContentType";
import { FolderId } from "../folder/FolderId";

export interface Note {
  id: NoteId;
  name: NoteName;
  code?: NoteContent;
  type: NoteContentType;
  folderId?: FolderId;
}
