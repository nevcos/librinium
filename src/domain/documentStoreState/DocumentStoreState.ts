import type { DocumentId } from "../document/DocumentId";
import type { DocumentMap } from "../document/DocumentMap";

export interface DocumentStoreState {
  isLoading: boolean;
  error: string | null;
  selectedDocumentId: DocumentId | null;
  documents: DocumentMap;
}
