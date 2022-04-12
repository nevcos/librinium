import type { DocumentId } from "./DocumentId";
import type { DocumentName } from "./DocumentName";
import type { DocumentContent } from "./DocumentContent";
import { DocumentContentType } from "./DocumentContentType";
import { FolderId } from "../folder/FolderId";

export interface Document {
  id: DocumentId;
  name: DocumentName;
  code: DocumentContent;
  type: DocumentContentType;
  folderId: FolderId;
}
