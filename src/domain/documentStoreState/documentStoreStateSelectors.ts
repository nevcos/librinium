import type { DocumentId } from "../document/DocumentId";
import { getNextDocumentId } from "../document/DocumentId";
import type { DocumentName } from "../document/DocumentName";
import type { DocumentContent } from "../document/DocumentContent";
import type { Document } from "../document/Document";
import type { DocumentStoreState } from "./DocumentStoreState";
import { DocumentContentType } from "../document/DocumentContentType";

export function createEmptyGistState(): DocumentStoreState {
  return {
    isLoading: false,
    error: null,
    documents: {}
  };
}

export function createNewDocument(type: DocumentContentType): Document {
  const id = getNextDocumentId();
  switch (type) {
    case DocumentContentType.PLANT_UML:
      return createNewPlantUml();
    case DocumentContentType.REMARK:
      return createNewRemark();
    default:
      return {
        id,
        name: `New Document` as DocumentName,
        code: `New->Document` as DocumentContent,
        type
      };
  }
}

export function createNewPlantUml(): Document {
  const id = getNextDocumentId();
  return {
    id,
    name: `New Diagram` as DocumentName,
    code: `New->Diagram` as DocumentContent,
    type: DocumentContentType.PLANT_UML
  };
}

export function createNewRemark(): Document {
  const id = getNextDocumentId();
  return {
    id,
    name: `New Presentation` as DocumentName,
    code: `# Slide 1\n* Item 1\n* Item 2\n---\n# Slide 2` as DocumentContent,
    type: DocumentContentType.REMARK
  };
}

export function isLoading(state: DocumentStoreState): boolean {
  return state.isLoading;
}

export function getDocuments(state: DocumentStoreState): Document[] {
  return Object.values(state.documents);
}

export function getDocument(state: DocumentStoreState, documentId?: DocumentId): Document | null {
  if (!documentId) return null;
  return state.documents[documentId] || null;
}
