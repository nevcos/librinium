import { ContentTypeName } from "../../contentType/domain/ContentTypeName";
import type { NoteId } from "./NoteId";
import type { NoteName } from "./NoteName";
import type { NoteContent } from "./NoteContent";
import { FolderId } from "../folder/FolderId";

export interface Note {
  id: NoteId;
  name: NoteName;
  code?: NoteContent;
  type: ContentTypeName;
  folderId?: FolderId;
}
