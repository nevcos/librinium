import type { Document } from "../domain/document/Document";
import type { DocumentMap } from "../domain/document/DocumentMap";
import type { DocumentId } from "../domain/document/DocumentId";

const BASE_URL = "https://my-json-server.typicode.com/nevcos/react-plantuml-ide";

export async function getDocuments(): Promise<DocumentMap> {
  const response = await fetch(BASE_URL + "/documents");
  return await response.json();
}

export async function postDocument(document: Document): Promise<void> {
  const response = await fetch(BASE_URL + "/documents/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(document)
  });
  return await response.json();
}

export async function putDocument(id: DocumentId, update: Partial<Document>): Promise<void> {
  const response = await fetch(BASE_URL + `/documents/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update)
  });
  return await response.json();
}
