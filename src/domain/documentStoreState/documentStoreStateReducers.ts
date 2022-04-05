import type { DocumentMap } from "../document/DocumentMap";
import type { DocumentName } from '../document/DocumentName';
import type { Document } from "../document/Document";
import type { DocumentId } from "../document/DocumentId";
import type { DocumentContent } from "../document/DocumentContent";
import type { DocumentStoreState } from "./DocumentStoreState";
import { getSelectedDocument, getDocument } from './documentStoreStateSelectors';

interface Payload<T> { payload: T; }

export function setDocuments(state: DocumentStoreState, action: Payload<DocumentMap>): void {
  state.documents = action.payload;
  state.selectedDocumentId = Object.values(state.documents)[0]?.id;
}

export function addDocument(state: DocumentStoreState, action: Payload<Document>): void {
  const document = action.payload;
  state.documents[document.id] = document;
  state.selectedDocumentId = document.id;
}

export function selectDocument(state: DocumentStoreState, action: Payload<DocumentId>): void {
  // noinspection UnnecessaryLocalVariableJS
  const id = action.payload;
  state.selectedDocumentId = id;
}

export function updateSelectedDocumentContent(state: DocumentStoreState, action: Payload<DocumentContent>): void {
  const code = action.payload;
  const selectedDocument = getSelectedDocument(state);
  if (selectedDocument && selectedDocument.code !== code) {
    selectedDocument.code = code;
  }
}

export function deleteDocument(state: DocumentStoreState, action: Payload<DocumentId>): void {
  const id = action.payload;
  delete state.documents[id];
  if (state.selectedDocumentId === id) {
    state.selectedDocumentId = null;
  }
}

export function setIsLoading(state: DocumentStoreState, action: Payload<boolean>): void {
  state.isLoading = action.payload;
}

export function updateDocumentName(state: DocumentStoreState, action: Payload<{id: DocumentId, name: DocumentName}>): void {
  const {id, name} = action.payload;
  const document = getDocument(state, id);
  if (!document) throw new Error("Document not found");
  document.name = name;
}
