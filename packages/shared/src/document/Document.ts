import { DocumentId } from "./DocumentId";
import { DocumentName } from "./DocumentName";
import { DocumentContent } from "./DocumentContent";
import { DocumentContentType } from "./DocumentContentType";

export interface Document {
  id: DocumentId;
  name: DocumentName;
  code: DocumentContent;
  type: DocumentContentType;
}
