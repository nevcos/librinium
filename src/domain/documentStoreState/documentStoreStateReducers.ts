import type { DocumentMap } from "../document/DocumentMap";
import type { DocumentName } from "../document/DocumentName";
import type { Document } from "../document/Document";
import type { DocumentId } from "../document/DocumentId";
import type { DocumentContent } from "../document/DocumentContent";
import type { DocumentStoreState } from "./DocumentStoreState";
import { getDocument } from "./documentStoreStateSelectors";
import { FolderMap } from "../folder/FolderMap";

interface Payload<T> {
  payload: T;
}

// region Folders

export function setFolders(state: DocumentStoreState, action: Payload<FolderMap>): void {
  state.folders = action.payload;
}

// endregion
// region Documents

export function setDocuments(state: DocumentStoreState, action: Payload<DocumentMap>): void {
  state.documents = action.payload;
}

export function addDocument(state: DocumentStoreState, action: Payload<Document>): void {
  const document = action.payload;
  state.documents[document.id] = document;
}

export function updateDocumentContent(
  state: DocumentStoreState,
  action: Payload<{ id: DocumentId; code: DocumentContent }>
): void {
  const { id, code } = action.payload;
  const document = getDocument(state, id);
  if (document && document.code !== code) {
    document.code = code;
  }
}

export function deleteDocument(state: DocumentStoreState, action: Payload<DocumentId>): void {
  const id = action.payload;
  delete state.documents[id];
}

export function setIsLoading(state: DocumentStoreState, action: Payload<boolean>): void {
  state.isLoading = action.payload;
}

export function updateDocumentName(
  state: DocumentStoreState,
  action: Payload<{ id: DocumentId; name: DocumentName }>
): void {
  const { id, name } = action.payload;
  const document = getDocument(state, id);
  if (!document) throw new Error("Document not found");
  document.name = name;
}

// endregion
