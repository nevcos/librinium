import type { PayloadAction } from "@reduxjs/toolkit";
import type { DocumentMap } from "@nevcos/shared/src/document/DocumentMap";
import type { Document } from "@nevcos/shared/src/document/Document";
import type { DocumentId } from "@nevcos/shared/src/document/DocumentId";
import type { DocumentContent } from "@nevcos/shared/src/document/DocumentContent";
import type { DocumentStoreState } from "./DocumentStoreState";
import { getSelectedDocument } from "./documentStoreStateSelectors";

export function setDocuments(state: DocumentStoreState, action: PayloadAction<DocumentMap>): void {
  state.documents = action.payload;
  state.selectedDocumentId = Object.values(state.documents)[0]?.id;
}

export function addDocument(state: DocumentStoreState, action: PayloadAction<Document>): void {
  const document = action.payload;
  state.documents[document.id] = document;
  state.selectedDocumentId = document.id;
}

export function selectDocument(state: DocumentStoreState, action: PayloadAction<DocumentId>): void {
  // noinspection UnnecessaryLocalVariableJS
  const id = action.payload;
  state.selectedDocumentId = id;
}

export function updateSelectedDocumentContent(state: DocumentStoreState, action: PayloadAction<DocumentContent>): void {
  const code = action.payload;
  const selectedDocument = getSelectedDocument(state);
  if (selectedDocument && selectedDocument.code !== code) {
    selectedDocument.code = code;
  }
}

export function deleteDocument(state: DocumentStoreState, action: PayloadAction<DocumentId>): void {
  const id = action.payload;
  delete state.documents[id];
  if (state.selectedDocumentId === id) {
    state.selectedDocumentId = null;
  }
}

export function setIsLoading(state: DocumentStoreState, action: PayloadAction<boolean>): void {
  state.isLoading = action.payload;
}
