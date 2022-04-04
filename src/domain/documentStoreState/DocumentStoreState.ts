import { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import { DocumentMap } from "@nevcos/shared/src/document/DocumentMap";
import { documentsMapMock } from "@nevcos/shared/src/mock/documents";

export interface DocumentStoreState {
  isLoading: boolean;
  error: string | null;
  selectedDocumentId: DocumentId | null;
  documents: DocumentMap;
}

export const initialState: DocumentStoreState = {
  isLoading: false,
  error: null,
  selectedDocumentId: null,
  documents: {}
};
