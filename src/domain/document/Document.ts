import type { DocumentId } from "./DocumentId";
import type { DocumentName } from "./DocumentName";
import type { DocumentContent } from "./DocumentContent";
import type { DocumentContentType } from "./DocumentContentType";

export interface Document {
  id: DocumentId;
  name: DocumentName;
  code: DocumentContent;
  type: DocumentContentType;
}
