import { DocumentId, getNextDocumentId } from "@nevcos/shared/src/document/DocumentId";
import { DocumentName } from "@nevcos/shared/src/document/DocumentName";
import { DocumentContent } from "@nevcos/shared/src/document/DocumentContent";
import { Document } from "@nevcos/shared/src/document/Document";
import { DocumentStoreState } from "./DocumentStoreState";
import { DocumentContentType } from "@nevcos/shared/src/document/DocumentContentType";

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

export function getDocument(state: DocumentStoreState, documentId: DocumentId): Document | null {
  return getDocuments(state).find((document) => document.id === documentId) || null;
}

export function getSelectedDocument(state: DocumentStoreState): Document | null {
  if (!state.selectedDocumentId) return null;
  return getDocument(state, state.selectedDocumentId);
}